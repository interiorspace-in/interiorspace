import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface Blog {
  id: string;
  title: string;
  slug: string;
  meta_description: string;
  featured_image: string;
  author_name: string;
  publish_date: string;
  category: string | null;
  tags: string[] | null;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, slug, meta_description, featured_image, author_name, publish_date, category, tags")
      .eq("status", "published")
      .order("publish_date", { ascending: false });

    if (!error && data) {
      setBlogs(data);
    }
    setLoading(false);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.meta_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>Interior Design Blog | Tips & Ideas | Interior Space</title>
        <meta
          name="description"
          content="Explore expert interior design tips, home decoration ideas, and renovation guides from Interior Space. Get inspired for your dream home in Pune."
        />
        <meta
          name="keywords"
          content="interior design blog, home decor tips, Pune interiors, modular kitchen ideas, living room design"
        />
        <link rel="canonical" href={`${window.location.origin}/blogs`} />
        <meta property="og:title" content="Interior Design Blog | Interior Space" />
        <meta
          property="og:description"
          content="Expert interior design tips and home decoration ideas from Interior Space Pune."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/blogs`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Interior Design Blog
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover expert tips, design inspiration, and practical guides for creating your dream space.
              </p>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Blog Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted h-48 rounded-t-lg" />
                    <div className="p-6 bg-card rounded-b-lg">
                      <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                      <div className="h-3 bg-muted rounded w-full mb-2" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedBlogs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No blogs found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <Link to={`/blogs/${blog.slug}`}>
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={blog.featured_image || "/placeholder.svg"}
                          alt={blog.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      {blog.category && (
                        <Badge variant="secondary" className="mb-3">
                          {blog.category}
                        </Badge>
                      )}
                      <Link to={`/blogs/${blog.slug}`}>
                        <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {blog.meta_description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{blog.author_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(blog.publish_date)}</span>
                        </div>
                      </div>
                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="inline-block mt-4 text-primary font-medium hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentPage === i + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blogs;
