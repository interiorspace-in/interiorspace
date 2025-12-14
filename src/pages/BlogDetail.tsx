import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface Blog {
  id: string;
  title: string;
  slug: string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  featured_image?: string | null;
  content: string;
  author_name: string;
  publish_date: string;
  category?: string | null;
  tags?: string[] | null;
}

interface RelatedBlog {
  id: string;
  title: string;
  slug: string;
  meta_description?: string | null;
  featured_image?: string | null;
  author_name: string;
  publish_date: string;
  category?: string | null;
  tags?: string[] | null;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!error && data) {
      setBlog(data);
      fetchRelatedBlogs(data.category, data.id);
    }
    setLoading(false);
  };

  const fetchRelatedBlogs = async (category: string | null, currentId: string) => {
    let query = supabase
      .from("blogs")
      .select("id, title, slug, meta_description, featured_image, author_name, publish_date, category, tags")
      .eq("status", "published")
      .neq("id", currentId)
      .limit(3);

    if (category) {
      query = query.eq("category", category);
    }

    const { data } = await query.order("publish_date", { ascending: false });
    if (data) {
      setRelatedBlogs(data);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse max-w-4xl mx-auto">
              <div className="h-8 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-1/4 mb-8" />
              <div className="h-96 bg-muted rounded mb-8" />
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blogs" className="text-primary hover:underline">
              ← Back to Blogs
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const fullUrl = `${window.location.origin}/blogs/${blog.slug}`;

  // Schema markup for BlogPosting
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: blog.featured_image || "",
    datePublished: blog.publish_date,
    dateModified: blog.publish_date,
    author: {
      "@type": "Person",
      name: blog.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: "Interior Space",
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/favicon.ico`,
      },
    },
    description: blog.meta_description || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
  };

  return (
    <>
      <Helmet>
        <title>{blog.meta_title || blog.title} | Interior Space</title>
        <meta name="description" content={blog.meta_description || ""} />
        {blog.meta_keywords && <meta name="keywords" content={blog.meta_keywords} />}
        <link rel="canonical" href={fullUrl} />
        <meta property="og:title" content={blog.meta_title || blog.title} />
        <meta property="og:description" content={blog.meta_description || ""} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={fullUrl} />
        {blog.featured_image && <meta property="og:image" content={blog.featured_image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.meta_title || blog.title} />
        <meta name="twitter:description" content={blog.meta_description || ""} />
        {blog.featured_image && <meta name="twitter:image" content={blog.featured_image} />}
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <article className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Link */}
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blogs
              </Link>

              {/* Category */}
              {blog.category && (
                <Badge variant="secondary" className="mb-4">
                  {blog.category}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{blog.author_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <time dateTime={blog.publish_date}>{formatDate(blog.publish_date)}</time>
                </div>
              </div>

              {/* Featured Image */}
              {blog.featured_image && (
                <div className="aspect-video rounded-lg overflow-hidden mb-10">
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t">
                  <h3 className="font-semibold mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
              <section className="max-w-6xl mx-auto mt-16">
                <h2 className="text-2xl font-bold text-foreground mb-8">Related Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedBlogs.map((related) => (
                    <Link
                      key={related.id}
                      to={`/blogs/${related.slug}`}
                      className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={related.featured_image || "/placeholder.svg"}
                          alt={related.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {formatDate(related.publish_date)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogDetail;
