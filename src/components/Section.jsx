import { motion } from 'framer-motion';

export default function Section({ children, id, title, kicker }) {
  return (
    <section id={id} className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title && (
          <div className="mb-12">
            {kicker && (
              <div className="text-xs font-mono tracking-[0.4em] text-white/40 mb-3">
                {kicker}
              </div>
            )}
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 uppercase">{title}</h2>
            <div className="h-1 w-20 bg-brand rounded-full" />
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
