import { getAvatarColor, getInitials } from '../../lib/constants';

export default function Avatar({ name, size = 20, fontSize = 9 }) {
  const color = getAvatarColor(name);
  const initials = getInitials(name);

  return (
    <span
      className="author-avatar-sm"
      style={{
        background: color,
        width: size,
        height: size,
        fontSize,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initials}
    </span>
  );
}
