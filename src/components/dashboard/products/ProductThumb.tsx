export default function ProductThumb({ gradient }: { gradient: string }) {
  return (
    <div className="relative flex-shrink-0 overflow-hidden rounded-lg" style={{ width: 64, height: 64, border: '1px solid #E2E8F0', background: '#F1F5F9' }}>
      <div className={`absolute inset-1 rounded-md bg-gradient-to-br ${gradient}`} />
      <div className="absolute inset-[14px] rounded-sm border border-white/30 bg-white/10" />
    </div>
  );
}
