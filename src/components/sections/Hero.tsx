import React from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion"
import { MousePointer2, Database, Filter, Shield, Activity, BarChart3, Zap } from "lucide-react"
import { getWhatsappLink, WHATSAPP_MESSAGES } from "@/utils/whatsapp"
import { CTAButton } from "@/components/ui/CTAButton"

const NumberTicker = ({ value, suffix = "", decimals = 0, delay = 0 }: { value: number, suffix?: string, decimals?: number, delay?: number }) => {
    const ref = React.useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    })
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    React.useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                motionValue.set(value)
            }, delay * 1000)
            return () => clearTimeout(timer)
        }
    }, [isInView, value, motionValue, delay])

    React.useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toFixed(decimals) + suffix
            }
        })
    }, [springValue, decimals, suffix])

    return (
        <span ref={ref} className="tabular-nums">
            0{suffix}
        </span>
    )
}

const NeuralFeature = ({ icon: Icon, title, description, badge }: { icon: any, title: string, description: string, badge?: string }) => {
    return (
        <div className="spotlight-card relative p-8 flex flex-col items-start text-left group transition-all duration-500 rounded-[2rem] overflow-hidden min-h-full hover:bg-[#FEFDFA]/[0.02]">
            {/* O HUD Arredondado - Ajustado para w-8 para casar perfeitamente com o raio de 2rem (32px) */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#39F265]/30 rounded-tl-[2rem] group-hover:border-[#39F265] transition-all duration-500" />

            {/* O efeito de luz que se adapta ao mouse no hover */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(57, 242, 101, 0.08), transparent 80%)`
                }}
            />

            <div className="relative z-10 w-full">
                <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#39F265]/5 border border-[#39F265]/10 flex items-center justify-center group-hover:bg-[#39F265]/10 group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-5 h-5 text-[#39F265]" />
                    </div>
                    {badge && (
                        <span className="text-[9px] font-black text-[#39F265]/40 uppercase tracking-[0.2em]">
                            {badge}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-[#FEFDFA] mb-3 tracking-tight group-hover:text-[#39F265] transition-colors duration-500">{title}</h3>
                <p className="text-sm md:text-sm text-[#FEFDFA]/40 md:text-[#FEFDFA]/30 leading-relaxed max-w-full md:max-w-[280px] group-hover:text-[#FEFDFA]/50 transition-colors duration-500">{description}</p>
            </div>
        </div>
    )
}

export const Hero = () => {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const containerRef = React.useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const cards = containerRef.current.getElementsByClassName("spotlight-card")
        for (const card of cards as any) {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            card.style.setProperty("--mouse-x", `${x}px`)
            card.style.setProperty("--mouse-y", `${y}px`)
        }
    }

    return (
        <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 px-6 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[10%] left-[-20%] sm:left-[-10%] w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] bg-[#39F265]/5 rounded-full blur-[60px] lg:blur-[160px]"
                />
            </div>

            <div className="absolute top-10 left-12 hidden xl:block pointer-events-none z-20">
                <span className="text-2xl font-black text-[#FEFDFA]/25 tracking-tighter border-l-2 border-[#39F265] pl-4">Z-01</span>
            </div>

            <div className="max-w-[1440px] mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-1.5 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full border border-[#39F265]/20 bg-[#39F265]/5 mb-6 md:mb-12 overflow-hidden group">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#39F265] animate-pulse" />
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#39F265] whitespace-nowrap">ZAEOM OPERATING SYSTEM</span>
                        </div>
                        <div className="w-px h-3 bg-[#39F265]/20" />
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#FEFDFA]/40 whitespace-nowrap">V. 2026</span>
                    </div>

                    <h1 className="text-[2.2rem] xs:text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] 2xl:text-[7.5rem] font-bold md:font-black mb-6 md:mb-10 max-w-6xl mx-auto px-2 sm:px-4 text-balance leading-[1.1] md:leading-[0.9] tracking-[-0.05em] md:tracking-[-0.04em] text-[#FEFDFA]">
                        {"Sua Empresa no".split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block mr-[0.15em]"
                            >
                                {word}
                            </motion.span>
                        ))}
                        <motion.span
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.2, delay: 0.5 }}
                            className="text-gradient block mt-1"
                        >
                            Piloto Automático
                        </motion.span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="max-w-3xl mx-auto mb-10 md:mb-16 px-6"
                    >
                        <p className="text-sm md:text-xl lg:text-2xl text-[#FEFDFA]/50 md:text-[#FEFDFA]/60 leading-[1.6] md:leading-[1.6] font-medium tracking-tight">
                            Não somos apenas uma ferramenta, somos o seu braço operacional completo. Unimos IA com expertise humana para você economizar e focar no crescimento.
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-24 md:mb-32">
                        <div className="w-full md:w-auto px-4 md:px-0">
                            <CTAButton
                                href={getWhatsappLink(WHATSAPP_MESSAGES.GENERAL)}
                                icon={MousePointer2}
                            >
                                Agendar Diagnóstico
                            </CTAButton>
                        </div>

                        <div className="flex items-center gap-6 md:gap-8 md:pl-10 md:border-l border-[#FEFDFA]/10">
                            <div className="text-center md:text-left">
                                <p className="text-[9px] md:text-[10px] font-black text-[#FEFDFA]/30 uppercase tracking-[0.3em] mb-2 md:mb-3">Apoio Institucional</p>
                                <div className="flex gap-4 md:gap-6 items-center justify-center md:justify-start opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                                    <span className="text-[10px] md:text-xs font-black text-[#FEFDFA] tracking-tighter uppercase">ABSTARTUPS</span>
                                    <span className="text-[10px] md:text-xs font-black text-[#FEFDFA] tracking-tighter uppercase">SEBRAE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Neural Blueprint Grid - CLEAN, NO CARDS */}
                <div className="relative max-w-6xl mx-auto mb-24 md:mb-32 px-4">
                    <motion.div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.3
                                }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16 relative py-12"
                    >
                        {[
                            { icon: Database, badge: "Data Core", title: "Gestão de Informação Centralizada", desc: "Captura e organização automática de dados de clientes, fornecedores e parceiros. Sua base de conhecimento sempre atualizada." },
                            { icon: Filter, badge: "Priority Engine", title: "Triagem Inteligente 24/7", desc: "Algoritmos que filtram o que é prioridade. Seja um lead quente, uma nota fiscal pendente ou um suporte urgente, nada passa despercebido." },
                            { icon: Zap, badge: "Task Agent", title: "Execução Autônoma", desc: "Nossa IA não apenas agenda reuniões, ela executa tarefas: envia boletos, confirma presenças e responde dúvidas rotineiras." },
                            { icon: Activity, badge: "Network Flow", title: "Otimização de Processos", desc: "Melhora contínua dos fluxos de trabalho. Identificamos gargalos operacionais e ajustamos a rota para máxima eficiência." },
                            { icon: BarChart3, badge: "Predictive", title: "Previsibilidade de Resultados", desc: "Tenha clareza total. Relatórios que cruzam dados financeiros, comerciais e de produtividade para decisões baseadas em fatos." },
                            { icon: Shield, badge: "Infrastructure", title: "Segurança e Escala", desc: "Infraestrutura robusta preparada para escalar sua empresa. Cresça 10x sem precisar contratar 10x mais funcionários." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                }}
                            >
                                <NeuralFeature
                                    icon={feature.icon}
                                    badge={feature.badge}
                                    title={feature.title}
                                    description={feature.desc}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Authority Bar / Numbers - MONUMENTAL HUD STYLE */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-[#FEFDFA]/5 py-16 md:py-24 gap-y-12 md:gap-y-16 relative"
                >
                    <div className="text-center relative px-8 flex flex-col items-center">
                        <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[#FEFDFA] mb-4 tracking-tighter">
                            <NumberTicker value={4.8} suffix="M+" decimals={1} delay={0.2} />
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.4em] font-black text-[#39F265]/50 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#39F265] animate-pulse" />
                            Interações IA
                        </div>
                        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-[#FEFDFA]/10 to-transparent" />
                    </div>

                    <div className="text-center relative px-8 flex flex-col items-center">
                        <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[#FEFDFA] mb-4 tracking-tighter">
                            <NumberTicker value={30} suffix="k+" decimals={0} delay={0.4} />
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.4em] font-black text-[#FEFDFA]/30">Leads Gerados</div>
                        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-[#FEFDFA]/10 to-transparent" />
                    </div>

                    <div className="text-center relative px-8 flex flex-col items-center">
                        <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[#FEFDFA] mb-4 tracking-tighter">
                            <NumberTicker value={150} suffix="+" decimals={0} delay={0.6} />
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.4em] font-black text-[#FEFDFA]/30">Empresas Escalam</div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FEFDFA]/5 to-transparent" />
                </motion.div>

            </div>

            {/* Vertical HUD Scroll Indicator - Restored */}
            <div className="absolute bottom-12 left-12 hidden lg:flex flex-col items-center gap-3 pointer-events-none opacity-40">
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#39F265] to-transparent" />
                <span className="text-[9px] font-black text-[#FEFDFA] uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">Scroll Discovery</span>
            </div>
        </section>
    )
}
