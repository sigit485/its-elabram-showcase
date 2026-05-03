export default function UpvoteButton({ projectId, votes, voted, onToggle }) {
  function handleClick(e) {
    e.stopPropagation();
    onToggle(projectId);
  }

  return (
    <button
      className={`upvote-btn${voted ? ' voted' : ''}`}
      onClick={handleClick}
      title={voted ? 'Remove vote' : 'Upvote'}
    >
      <span className="upvote-arrow">{voted ? '▲' : '△'}</span>
      <span className="upvote-count">{votes}</span>
    </button>
  );
}
