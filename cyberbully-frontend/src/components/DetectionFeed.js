import PostCard from "./PostCard";

export default function DetectionFeed({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="text-center text-muted py-5" style={{ fontSize: 14 }}>
        No posts analysed yet. Submit something above.
      </div>
    );
  }

  return (
    <div>
      {/* Divider */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <hr className="flex-grow-1" />
        <span style={{ fontSize: 13, color: "#aaa" }}>Detection Feed</span>
        <hr className="flex-grow-1" />
      </div>

      {posts.map((post, i) => (
        <PostCard key={post.id} post={post} index={i} />
      ))}
    </div>
  );
}