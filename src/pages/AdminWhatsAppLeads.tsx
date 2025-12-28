import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useWhatsAppLeads, useUpdateLeadStatus, useUpdateLeadNotes, useLeadAnalytics, WhatsAppLead } from "@/hooks/useWhatsAppLeads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { 
  Loader2, Home, LogOut, MessageCircle, Smartphone, Monitor, 
  TrendingUp, Users, Calendar, Filter, StickyNote, Video,
  ChevronLeft, ChevronRight, ArrowUpDown
} from "lucide-react";
import { format, subDays, isAfter, isBefore, parseISO } from "date-fns";

const ITEMS_PER_PAGE = 10;

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  converted: "bg-green-100 text-green-800",
};

const AdminWhatsAppLeads = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { data: leads, isLoading: leadsLoading } = useWhatsAppLeads();
  const analytics = useLeadAnalytics();
  const updateStatus = useUpdateLeadStatus();
  const updateNotes = useUpdateLeadNotes();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof WhatsAppLead>("clicked_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const [selectedLead, setSelectedLead] = useState<WhatsAppLead | null>(null);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [notesValue, setNotesValue] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/auth");
    } else if (!loading && user && !isAdmin) {
      navigate("/admin/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/auth");
  };

  const projectTypes = useMemo(() => {
    if (!leads) return [];
    return [...new Set(leads.map(l => l.project_type))];
  }, [leads]);

  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    
    let result = [...leads];

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(l => l.status === statusFilter);
    }

    // Project type filter
    if (projectTypeFilter !== "all") {
      result = result.filter(l => l.project_type === projectTypeFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      let startDate: Date;
      
      switch (dateFilter) {
        case "today":
          startDate = subDays(now, 1);
          break;
        case "week":
          startDate = subDays(now, 7);
          break;
        case "month":
          startDate = subDays(now, 30);
          break;
        default:
          startDate = new Date(0);
      }
      
      result = result.filter(l => isAfter(parseISO(l.clicked_at), startDate));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(l => 
        l.client_name.toLowerCase().includes(query) ||
        l.project_type.toLowerCase().includes(query) ||
        l.page_source.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

    return result;
  }, [leads, statusFilter, projectTypeFilter, dateFilter, searchQuery, sortField, sortDirection]);

  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLeads.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLeads, currentPage]);

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);

  const handleStatusChange = async (leadId: string, newStatus: "new" | "contacted" | "converted") => {
    try {
      await updateStatus.mutateAsync({ id: leadId, status: newStatus });
      toast.success("Status updated!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const openNotesDialog = (lead: WhatsAppLead) => {
    setSelectedLead(lead);
    setNotesValue(lead.notes || "");
    setNotesDialogOpen(true);
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    
    try {
      await updateNotes.mutateAsync({ id: selectedLead.id, notes: notesValue });
      toast.success("Notes saved!");
      setNotesDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save notes");
    }
  };

  const toggleSort = (field: keyof WhatsAppLead) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  if (loading || leadsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              WhatsApp Leads
            </h1>
            <p className="text-sm text-muted-foreground">Track and manage testimonial leads</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/testimonials")}>
              <Video className="w-4 h-4 mr-2" />
              Testimonials
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold text-foreground">{analytics.totalLeads}</p>
              <p className="text-xs text-muted-foreground">Total Leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Badge className={statusColors.new + " mb-1"}>New</Badge>
              <p className="text-2xl font-bold text-foreground">{analytics.newLeads}</p>
              <p className="text-xs text-muted-foreground">New Leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Badge className={statusColors.contacted + " mb-1"}>Contacted</Badge>
              <p className="text-2xl font-bold text-foreground">{analytics.contactedLeads}</p>
              <p className="text-xs text-muted-foreground">Contacted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Badge className={statusColors.converted + " mb-1"}>Converted</Badge>
              <p className="text-2xl font-bold text-foreground">{analytics.convertedLeads}</p>
              <p className="text-xs text-muted-foreground">Converted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Smartphone className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold text-foreground">{analytics.mobileLeads}</p>
              <p className="text-xs text-muted-foreground">Mobile</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Monitor className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold text-foreground">{analytics.desktopLeads}</p>
              <p className="text-xs text-muted-foreground">Desktop</p>
            </CardContent>
          </Card>
        </div>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Top Performing Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {analytics.topTestimonials.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data yet</p>
              ) : (
                <ul className="space-y-1">
                  {analytics.topTestimonials.map((t, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span className="truncate">{t.name}</span>
                      <Badge variant="secondary">{t.count}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                Top Project Types
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {analytics.topProjectTypes.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data yet</p>
              ) : (
                <ul className="space-y-1">
                  {analytics.topProjectTypes.map((t, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span>{t.type}</span>
                      <Badge variant="secondary">{t.count}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Today</span>
                  <Badge variant="outline">{analytics.dailyLeads} leads</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>This Week</span>
                  <Badge variant="outline">{analytics.weeklyLeads} leads</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Search</Label>
                <Input
                  placeholder="Search by client, project type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="w-full md:w-40">
                <Label className="text-xs text-muted-foreground">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Label className="text-xs text-muted-foreground">Project Type</Label>
                <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {projectTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Label className="text-xs text-muted-foreground">Date Range</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => toggleSort("clicked_at")}>
                      <div className="flex items-center gap-1">
                        Date <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => toggleSort("client_name")}>
                      <div className="flex items-center gap-1">
                        Client <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead>Project Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No leads found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(parseISO(lead.clicked_at), "MMM d, yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="font-medium">{lead.client_name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{lead.project_type}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{lead.page_source}</TableCell>
                        <TableCell>
                          {lead.device_type === "Mobile" ? (
                            <Smartphone className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Monitor className="w-4 h-4 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={lead.status}
                            onValueChange={(value: "new" | "contacted" | "converted") => 
                              handleStatusChange(lead.id, value)
                            }
                          >
                            <SelectTrigger className="w-28 h-8">
                              <Badge className={statusColors[lead.status] + " text-xs"}>
                                {lead.status}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="converted">Converted</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openNotesDialog(lead)}
                            className="h-8"
                          >
                            <StickyNote className={`w-4 h-4 ${lead.notes ? "text-primary" : "text-muted-foreground"}`} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredLeads.length)} of {filteredLeads.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Notes Dialog */}
      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedLead && (
              <div className="text-sm text-muted-foreground">
                <p><strong>Client:</strong> {selectedLead.client_name}</p>
                <p><strong>Project:</strong> {selectedLead.project_type}</p>
              </div>
            )}
            <Textarea
              placeholder="Add notes about this lead..."
              value={notesValue}
              onChange={(e) => setNotesValue(e.target.value)}
              rows={4}
            />
            <Button onClick={saveNotes} className="w-full" disabled={updateNotes.isPending}>
              {updateNotes.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Notes"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWhatsAppLeads;
