export default function Architecture() {
  const colors = {
    react: "#61DAFB",
    django: "#092E20",
    djangoLight: "#44B78B",
    ml: "#FF6B6B",
    db: "#F7B731",
    bg: "#0F172A",
    card: "#1E293B",
    border: "#334155",
    text: "#E2E8F0",
    muted: "#94A3B8",
  };

  const Arrow = ({ x1, y1, x2, y2, label }) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    return (
      <g>
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#64748B" />
          </marker>
        </defs>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748B" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="6,3" />
        {label && (
          <text x={mx} y={my - 8} textAnchor="middle" fontSize="11" fill="#94A3B8">{label}</text>
        )}
      </g>
    );
  };

  const Box = ({ x, y, w, h, color, title, subtitle, icon }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={colors.card} stroke={color} strokeWidth="2" />
      <text x={x + w / 2} y={y + 26} textAnchor="middle" fontSize="20">{icon}</text>
      <text x={x + w / 2} y={y + 48} textAnchor="middle" fontSize="13" fontWeight="bold" fill={color}>{title}</text>
      {subtitle && (
        <text x={x + w / 2} y={y + 64} textAnchor="middle" fontSize="10" fill={colors.muted}>{subtitle}</text>
      )}
    </g>
  );

  return (
    <div style={{ background: colors.bg, padding: "32px", borderRadius: "16px", fontFamily: "sans-serif" }}>
      <h2 style={{ color: colors.text, textAlign: "center", marginBottom: "8px", fontSize: "18px" }}>
        🛡️ Cyberbullying Detection App — System Architecture
      </h2>
      <p style={{ color: colors.muted, textAlign: "center", fontSize: "12px", marginBottom: "24px" }}>
        React Frontend → Django REST API → BiLSTM Model → Response
      </p>

      <svg viewBox="0 0 820 420" width="100%" style={{ display: "block" }}>

        {/* FRONTEND */}
        <Box x={20} y={160} w={160} h={100} color={colors.react} title="React Frontend" subtitle="Post UI + Result Display" icon="⚛️" />

        {/* Arrow: React → Django */}
        <Arrow x1={180} y1={210} x2={280} y2={210} label="HTTP POST /api/detect" />

        {/* DJANGO LAYER */}
        <rect x={280} y={80} width={260} height={260} rx="14" fill="#0D2318" stroke={colors.djangoLight} strokeWidth="1.5" strokeDasharray="6,3" />
        <text x={410} y={106} textAnchor="middle" fontSize="11" fill={colors.djangoLight} fontWeight="bold">🟢 Django REST Framework</text>

        <Box x={300} y={115} w={220} h={75} color={colors.djangoLight} title="views.py" subtitle="DetectView (APIView)" icon="🔌" />
        <Arrow x1={410} y1={190} x2={410} y2={225} />
        <Box x={300} y={225} w={220} h={75} color="#60A5FA" title="ml_service.py" subtitle="Loads & runs BiLSTM model" icon="⚙️" />
        <Arrow x1={410} y1={300} x2={410} y2={330} />
        <Box x={300} y={330} w={220} h={75} color={colors.db} title="models.py + DB" subtitle="Saves post + prediction" icon="🗄️" />

        {/* Arrow: Django → ML */}
        <Arrow x1={540} y1={260} x2={620} y2={260} label="predict(text)" />

        {/* ML MODEL BOX */}
        <Box x={620} y={210} w={180} h={100} color={colors.ml} title="BiLSTM Model" subtitle=".keras + Tokenizer (.pkl)" icon="🧠" />

        {/* Arrow: ML → Django (return) */}
        <line x1={620} y1={290} x2={560} y2={300} stroke="#FF6B6B" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrow)" />
        <text x={588} y={312} textAnchor="middle" fontSize="10" fill={colors.ml}>label + confidence</text>

        {/* Arrow: Django → React response */}
        <Arrow x1={280} y1={240} x2={180} y2={240} label="JSON response" />

        {/* COLAB badge */}
        <rect x={620} y={100} width={180} height={60} rx="8" fill={colors.card} stroke="#F59E0B" strokeWidth="1.5" />
        <text x={710} y={124} textAnchor="middle" fontSize="14">📓</text>
        <text x={710} y={142} textAnchor="middle" fontSize="11" fill="#F59E0B" fontWeight="bold">Google Colab</text>
        <text x={710} y={155} textAnchor="middle" fontSize="9" fill={colors.muted}>Export .keras + tokenizer.pkl</text>
        <Arrow x1={710} y1={160} x2={710} y2={210} label="" />

      </svg>

      {/* Steps legend */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
        {[
          { step: "1", label: "Export BiLSTM from Colab", color: "#F59E0B" },
          { step: "2", label: "Django API receives post text", color: colors.djangoLight },
          { step: "3", label: "ml_service.py runs prediction", color: "#60A5FA" },
          { step: "4", label: "Returns label + confidence %", color: colors.ml },
        ].map(({ step, label, color }) => (
          <div key={step} style={{ background: colors.card, border: `1px solid ${color}`, borderRadius: "8px", padding: "8px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ background: color, color: "#000", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold" }}>{step}</span>
            <span style={{ color: colors.text, fontSize: "12px" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}