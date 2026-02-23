/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  Shirt, 
  Calendar, 
  MapPin, 
  Clock, 
  Music, 
  Star, 
  Disc, 
  ChevronRight, 
  CheckCircle2,
  Copy,
  ExternalLink,
  Menu,
  X,
  Instagram,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ShirtSize = 'P' | 'M' | 'G';

interface TicketOption {
  id: string;
  name: string;
  price: number;
  description: string;
  includesShirt: boolean;
}

const TICKET_OPTIONS: TicketOption[] = [
  {
    id: 'ticket-only',
    name: 'Ingresso Individual',
    price: 20,
    description: 'Acesso total ao evento Castelo Rock Fest 2026.',
    includesShirt: false,
  },
  {
    id: 'ticket-shirt',
    name: 'Ingresso + Camisa',
    price: 50,
    description: 'Acesso total ao evento + Camisa oficial do festival (P, M ou G).',
    includesShirt: true,
  }
];

const PIX_KEY = "98984595785";

export default function App() {
  const [selectedOption, setSelectedOption] = useState<TicketOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<ShirtSize>('M');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openCheckout = (option: TicketOption) => {
    setSelectedOption(option);
    setIsModalOpen(true);
  };

  const handleFinishPurchase = () => {
    if (!selectedOption) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    const receipt = `
--------------------------------
    CASTELO ROCK FEST 2026
--------------------------------
DATA: ${dateStr} ${timeStr}
LOCAL: Arari - MA
--------------------------------
ITEM: ${selectedOption.name.toUpperCase()}
${selectedOption.includesShirt ? `TAMANHO: ${selectedSize}\n` : ''}VALOR: R$ ${selectedOption.price},00
--------------------------------
PAGAMENTO: PIX
CHAVE: ${PIX_KEY}
--------------------------------
OBRIGADO PELA PREFERÊNCIA!
--------------------------------
    *ENVIE O COMPROVANTE*
    *DO PIX JUNTO COM*
    *ESTA MENSAGEM*
--------------------------------`.trim();

    const encodedReceipt = encodeURIComponent(receipt);
    const whatsappUrl = `https://wa.me/55${PIX_KEY}?text=${encodedReceipt}`;
    
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-black text-2xl italic transform -skew-x-12">
                C
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic">Castelo Rock Fest</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium hover:text-red-500 transition-colors">Início</a>
              <a href="#lineup" className="text-sm font-medium hover:text-red-500 transition-colors">Lineup</a>
              <a href="#ingressos" className="text-sm font-medium hover:text-red-500 transition-colors">Ingressos</a>
              <a href="#patrocinio" className="text-sm font-medium hover:text-red-500 transition-colors">Patrocínio</a>
              <button 
                onClick={() => document.getElementById('ingressos')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105"
              >
                Comprar Agora
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-4 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Início</a>
              <a href="#lineup" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Lineup</a>
              <a href="#ingressos" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Ingressos</a>
              <a href="#patrocinio" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Patrocínio</a>
              <button 
                onClick={() => { setIsMenuOpen(false); document.getElementById('ingressos')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="bg-red-600 text-white py-4 rounded-xl text-xl font-bold"
              >
                Comprar Agora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/rockfest/1920/1080?blur=2" 
            className="w-full h-full object-cover opacity-40"
            alt="Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-red-600/20 border border-red-600/50 rounded-full text-red-500 text-sm font-bold tracking-widest uppercase mb-6">
              Arari - Maranhão
            </span>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic mb-6 leading-none">
              Castelo <br />
              <span className="text-red-600">Rock Fest</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-12 max-w-2xl mx-auto">
              O maior encontro de rock da região está de volta. Uma experiência visceral no coração de Arari.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                <Calendar className="text-red-600" />
                <div className="text-left">
                  <p className="text-xs text-zinc-500 uppercase font-bold">Data</p>
                  <p className="font-bold">11 de Julho, 2026</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                <Clock className="text-red-600" />
                <div className="text-left">
                  <p className="text-xs text-zinc-500 uppercase font-bold">Horário</p>
                  <p className="font-bold">A partir das 16:00</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                <MapPin className="text-red-600" />
                <div className="text-left">
                  <p className="text-xs text-zinc-500 uppercase font-bold">Local</p>
                  <p className="font-bold">Castelo Night Club</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => document.getElementById('ingressos')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-flex items-center gap-2 bg-red-600 text-white px-10 py-5 rounded-full text-xl font-black uppercase italic transition-all hover:bg-red-700 hover:scale-105 active:scale-95"
            >
              Garantir meu lugar
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Lineup Section */}
      <section id="lineup" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-4">Lineup <span className="text-red-600">Oficial</span></h2>
            <p className="text-zinc-500 max-w-xl mx-auto">As melhores atrações reunidas para uma noite inesquecível de puro rock and roll.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Banda Estadual', desc: 'Atração Principal', icon: Star, color: 'text-yellow-500' },
              { title: 'Banda Local', desc: 'O Melhor de Arari', icon: Music, color: 'text-red-600' },
              { title: 'DJ Set', desc: 'Mixagens Exclusivas', icon: Disc, color: 'text-blue-500' },
              { title: 'Participações', desc: 'Convidados Especiais', icon: Star, color: 'text-purple-500' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl text-center group transition-all hover:border-red-600/50"
              >
                <div className={cn("w-16 h-16 mx-auto rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", item.color)}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-500 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="ingressos" className="py-24 bg-zinc-900/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-4">Escolha seu <span className="text-red-600">Acesso</span></h2>
            <p className="text-zinc-500">Valores exclusivos de pré-venda. Garanta já o seu!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TICKET_OPTIONS.map((option) => (
              <div 
                key={option.id}
                className={cn(
                  "relative bg-zinc-900 border-2 p-8 rounded-[2rem] flex flex-col transition-all hover:scale-[1.02]",
                  option.includesShirt ? "border-red-600 shadow-2xl shadow-red-600/10" : "border-zinc-800"
                )}
              >
                {option.includesShirt && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    Mais Vendido
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{option.description}</p>
                  </div>
                  <div className={cn("p-3 rounded-2xl", option.includesShirt ? "bg-red-600/10 text-red-600" : "bg-zinc-800 text-zinc-400")}>
                    {option.includesShirt ? <Shirt size={24} /> : <Ticket size={24} />}
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-sm text-zinc-500 font-bold uppercase">R$</span>
                    <span className="text-5xl font-black tracking-tighter">{option.price},00</span>
                  </div>

                  <button 
                    onClick={() => openCheckout(option)}
                    className={cn(
                      "w-full py-4 rounded-2xl font-black uppercase italic transition-all active:scale-95",
                      option.includesShirt 
                        ? "bg-red-600 text-white hover:bg-red-700" 
                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                    )}
                  >
                    Selecionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="patrocinio" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-4">Nossos <span className="text-red-600">Patrocinadores</span></h2>
            <p className="text-zinc-500 max-w-xl mx-auto">Marcas que acreditam e fortalecem a cena rock em nossa região.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i}
                className="aspect-video bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center justify-center group hover:border-red-600/30 transition-all"
              >
                <div className="text-zinc-700 font-black uppercase italic tracking-widest text-sm group-hover:text-zinc-500 transition-colors">
                  Sua Marca Aqui
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-zinc-400 mb-6 font-medium">Quer ver sua marca no Castelo Rock Fest?</p>
            <a 
              href="https://wa.me/5598984595785" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-600 font-bold uppercase italic hover:text-red-500 transition-colors"
            >
              Seja um patrocinador <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-black italic transform -skew-x-12">
                C
              </div>
              <span className="font-black tracking-tighter uppercase italic">Castelo Rock Fest</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>

            <p className="text-zinc-600 text-sm">
              © 2026 Castelo Rock Fest. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isModalOpen && selectedOption && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Finalizar <span className="text-red-600">Compra</span></h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-zinc-800/50 p-6 rounded-3xl border border-zinc-700">
                    <p className="text-xs text-zinc-500 uppercase font-black mb-1">Item Selecionado</p>
                    <p className="text-xl font-bold">{selectedOption.name}</p>
                    <p className="text-2xl font-black text-red-600 mt-2">R$ {selectedOption.price},00</p>
                  </div>

                  {selectedOption.includesShirt && (
                    <div>
                      <p className="text-xs text-zinc-500 uppercase font-black mb-3">Tamanho da Camisa</p>
                      <div className="flex gap-3">
                        {(['P', 'M', 'G'] as ShirtSize[]).map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                              "flex-1 py-3 rounded-xl font-bold transition-all border-2",
                              selectedSize === size 
                                ? "bg-red-600 border-red-600 text-white" 
                                : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white p-6 rounded-3xl flex flex-col items-center text-center">
                    <p className="text-xs text-zinc-400 uppercase font-black mb-4">Pagamento via PIX</p>
                    
                    {/* Placeholder for QR Code */}
                    <div className="w-48 h-48 bg-zinc-100 rounded-2xl flex items-center justify-center mb-4 border-4 border-zinc-200">
                      <div className="text-zinc-300 flex flex-col items-center">
                        <ExternalLink size={40} className="mb-2" />
                        <span className="text-[10px] font-bold uppercase">QR Code PIX</span>
                      </div>
                    </div>

                    <div className="w-full space-y-3">
                      <div className="flex items-center justify-between bg-zinc-100 p-4 rounded-2xl border border-zinc-200">
                        <div className="text-left">
                          <p className="text-[10px] text-zinc-400 uppercase font-black">Chave PIX</p>
                          <p className="text-zinc-900 font-mono font-bold tracking-wider">{PIX_KEY}</p>
                        </div>
                        <button 
                          onClick={handleCopyPix}
                          className="p-3 bg-zinc-200 hover:bg-zinc-300 rounded-xl transition-colors text-zinc-600"
                        >
                          {copied ? <CheckCircle2 size={20} className="text-green-600" /> : <Copy size={20} />}
                        </button>
                      </div>
                      
                      <p className="text-[10px] text-zinc-400 font-medium">
                        Após o pagamento, envie o comprovante para o nosso WhatsApp para validação do seu ingresso.
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleFinishPurchase}
                  className="w-full mt-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase italic hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  Enviar para WhatsApp <ExternalLink size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
