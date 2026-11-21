import { useState } from 'react';

type Category = 'all' | 'ai' | 'editor' | 'simple';

interface VideoTool {
  id: string;
  name: string;
  category: Category;
  company: string;
  description: string;
  features: string[];
  price: string;
  difficulty: '쉬움' | '보통' | '어려움';
  bestFor: string;
  icon: string;
  gradient: string;
}

const tools: VideoTool[] = [
  {
    id: 'sora',
    name: 'Sora',
    category: 'ai',
    company: 'OpenAI',
    description: '텍스트 프롬프트로 고품질 영상을 생성하는 AI 모델. 사실적인 물리 시뮬레이션과 긴 영상 생성이 가능합니다.',
    features: ['텍스트→영상', '이미지→영상', '최대 1분 영상', '사실적 물리 효과', '다양한 스타일'],
    price: 'ChatGPT Plus ($20/월) 이상',
    difficulty: '쉬움',
    bestFor: '크리에이티브 영상, 광고, 뮤직비디오',
    icon: '🎬',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'runway',
    name: 'Runway Gen-3 Alpha',
    category: 'ai',
    company: 'Runway',
    description: '전문가를 위한 AI 영상 생성 및 편집 플랫폼. 정교한 컨트롤과 다양한 AI 도구를 제공합니다.',
    features: ['텍스트→영상', '영상→영상', '모션 브러시', '그린스크린 제거', '인페인팅'],
    price: '무료 플랜 / Standard $12/월',
    difficulty: '보통',
    bestFor: '전문 영상 제작, VFX, 광고',
    icon: '🚀',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'veo',
    name: 'Veo 2',
    category: 'ai',
    company: 'Google DeepMind',
    description: 'Google의 최신 AI 영상 생성 모델. 4K 해상도와 사실적인 영상 생성이 가능합니다.',
    features: ['4K 해상도', '텍스트→영상', '사실적 렌더링', '다양한 시네마틱 스타일', '긴 영상 지원'],
    price: 'Google AI Studio / Gemini Advanced',
    difficulty: '쉬움',
    bestFor: '고해상도 콘텐츠, 시네마틱 영상',
    icon: '✨',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    id: 'kling',
    name: 'Kling AI',
    category: 'ai',
    company: 'Kuaishou',
    description: '중국의 AI 영상 생성 도구. 긴 영상과 높은 일관성으로 유명합니다.',
    features: ['최대 2분 영상', '높은 일관성', '캐릭터 유지', '텍스트→영상', '이미지→영상'],
    price: '무료 플랜 / Pro $10/월',
    difficulty: '쉬움',
    bestFor: '스토리텔링, 캐릭터 중심 영상',
    icon: '🎭',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'pika',
    name: 'Pika 2.0',
    category: 'ai',
    company: 'Pika Labs',
    description: '빠르고 직관적인 AI 영상 생성 도구. 특수 효과와 스타일 변환에 강점이 있습니다.',
    features: ['특수 효과', '스타일 변환', '입맞춤 효과', '확대/축소', '빠른 생성'],
    price: '무료 플랜 / Standard $8/월',
    difficulty: '쉬움',
    bestFor: 'SNS 콘텐츠, 빠른 영상 제작',
    icon: '⚡',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'premiere',
    name: 'Premiere Pro',
    category: 'editor',
    company: 'Adobe',
    description: '업계 표준 영상 편집 소프트웨어. AI 기능(Firefly)이 통합되어 더욱 강력해졌습니다.',
    features: ['멀티트랙 편집', 'AI 자막 생성', 'AI 오디오 향상', 'Color Grading', '모션 그래픽'],
    price: '$22.99/월',
    difficulty: '어려움',
    bestFor: '전문 영상 편집, 영화/방송 제작',
    icon: '🎞️',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    category: 'editor',
    company: 'Blackmagic Design',
    description: '무료로도 강력한 기능을 제공하는 전문 영상 편집 도구. 컬러 그레이딩에 특히 뛰어납니다.',
    features: ['무료 버전 강력', '컬러 그레이딩', 'Fairlight 오디오', 'Fusion VFX', 'AI 기능'],
    price: '무료 / Studio $295 (일시불)',
    difficulty: '어려움',
    bestFor: '컬러 그레이딩, 포스트 프로덕션',
    icon: '🎨',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    id: 'finalcut',
    name: 'Final Cut Pro',
    category: 'editor',
    company: 'Apple',
    description: 'Mac 전용 영상 편집 소프트웨어. 최적화된 성능과 직관적인 인터페이스가 특징입니다.',
    features: ['Mac 최적화', ' Magnetic Timeline', '360° 편집', 'HDR 지원', 'AI 자동 기능'],
    price: '$299.99 (일시불)',
    difficulty: '보통',
    bestFor: 'Mac 사용자, 빠른 편집 워크플로우',
    icon: '🍎',
    gradient: 'from-gray-600 to-gray-800',
  },
  {
    id: 'capcut',
    name: 'CapCut',
    category: 'simple',
    company: 'ByteDance',
    description: 'TikTok 제작사가 만든 무료 영상 편집 앱. 템플릿과 AI 기능이 풍부합니다.',
    features: ['무료', 'AI 자막', '템플릿', '배경 제거', 'TikTok 연동'],
    price: '무료 / Pro $7.99/월',
    difficulty: '쉬움',
    bestFor: 'SNS 콘텐츠, 숏폼 영상',
    icon: '📱',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'canva',
    name: 'Canva Video',
    category: 'simple',
    company: 'Canva',
    description: '디자인 플랫폼 Canva의 영상 편집 기능. 드래그 앤 드롭으로 쉽게 영상을 만들 수 있습니다.',
    features: ['템플릿 수천개', '드래그앤드롭', 'AI 영상 생성', '브랜드 키트', '협업 기능'],
    price: '무료 / Pro $12.99/월',
    difficulty: '쉬움',
    bestFor: '마케팅 영상, 프레젠테이션',
    icon: '🎯',
    gradient: 'from-violet-500 to-purple-500',
  },
];

const categories = [
  { key: 'all' as Category, label: '전체', icon: '📋' },
  { key: 'ai' as Category, label: 'AI 영상 생성', icon: '🤖' },
  { key: 'editor' as Category, label: '전문 편집 도구', icon: '🎬' },
  { key: 'simple' as Category, label: '간편 도구', icon: '✨' },
];

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedTool, setSelectedTool] = useState<VideoTool | null>(null);

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
              <span className="text-sm text-gray-300">🎥 2026년 최신 업데이트</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                영상 제작
              </span>
              <br />
              <span className="text-white">무엇으로 할까?</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              2026년, AI 영상 생성부터 전문 편집까지.<br className="hidden sm:block" />
              목적에 맞는 최적의 영상 제작 도구를 찾아보세요.
            </p>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-white text-gray-900 shadow-lg shadow-white/20 scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${tool.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
              
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{tool.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                    <p className="text-sm text-gray-400">{tool.company}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tool.difficulty === '쉬움' ? 'bg-green-500/20 text-green-300' :
                  tool.difficulty === '보통' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {tool.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
                {tool.description}
              </p>

              {/* Features preview */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tool.features.slice(0, 3).map((feature, i) => (
                  <span key={i} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-md">
                    {feature}
                  </span>
                ))}
                {tool.features.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{tool.features.length - 3}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-xs text-gray-400">💰 {tool.price.split('/')[0].trim()}</span>
                <span className="text-xs text-purple-400 group-hover:text-purple-300 transition-colors">
                  자세히 보기 →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          한눈에 <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">비교</span>하기
        </h2>
        <p className="text-gray-400 text-center mb-10">주요 도구별 특징을 비교해보세요</p>
        
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left px-6 py-4 text-gray-300 font-semibold">도구</th>
                <th className="text-left px-6 py-4 text-gray-300 font-semibold">유형</th>
                <th className="text-left px-6 py-4 text-gray-300 font-semibold">난이도</th>
                <th className="text-left px-6 py-4 text-gray-300 font-semibold">가격</th>
                <th className="text-left px-6 py-4 text-gray-300 font-semibold hidden sm:table-cell">추천 대상</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, idx) => (
                <tr key={tool.id} className={`border-t border-white/5 ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''} hover:bg-white/5 transition-colors`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span>{tool.icon}</span>
                      <span className="font-medium text-white">{tool.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tool.category === 'ai' ? 'bg-purple-500/20 text-purple-300' :
                      tool.category === 'editor' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {tool.category === 'ai' ? 'AI 생성' : tool.category === 'editor' ? '전문 편집' : '간편'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs ${
                      tool.difficulty === '쉬움' ? 'text-green-400' :
                      tool.difficulty === '보통' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {tool.difficulty === '쉬움' ? '⭐' : tool.difficulty === '보통' ? '⭐⭐' : '⭐⭐⭐'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-xs">{tool.price}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs hidden sm:table-cell">{tool.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recommendation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          어떤 <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">상황</span>에 어떤 도구?
        </h2>
        <p className="text-gray-400 text-center mb-10">목적에 맞는 추천 도구를 확인하세요</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { scenario: '🎵 YouTube 영상', recommendation: 'Premiere Pro / DaVinci Resolve', desc: '풀 기능 편집 필요' },
            { scenario: '📸 SNS 숏폼', recommendation: 'CapCut / Pika', desc: '빠르고 트렌디하게' },
            { scenario: '🎨 광고/마케팅', recommendation: 'Runway / Canva', desc: '비주얼 임팩트 중요' },
            { scenario: '🤖 AI로만 만들기', recommendation: 'Sora / Veo 2', desc: '텍스트로 영상 생성' },
            { scenario: '🎬 영화/단편', recommendation: 'DaVinci Resolve', desc: '컬러 & 포스트 프로덕션' },
            { scenario: '💼 비즈니스 영상', recommendation: 'Canva / CapCut', desc: '빠른 제작, 협업' },
            { scenario: '🎓 교육 콘텐츠', recommendation: 'CapCut / Premiere Pro', desc: '자막, 설명 자료' },
            { scenario: '🖼️ 아트/실험적', recommendation: 'Runway / Sora', desc: '창의적 AI 표현' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
              <h4 className="font-bold text-white mb-2">{item.scenario}</h4>
              <p className="text-purple-300 text-sm font-medium mb-1">{item.recommendation}</p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              2026년 영상 제작 도구 가이드
            </p>
            <p className="text-gray-500 text-xs">
              AI 기술의 발전으로 누구나 고품질 영상을 만들 수 있는 시대입니다. 🎥
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedTool && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedTool(null)}
        >
          <div 
            className="bg-gray-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedTool(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">{selectedTool.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedTool.name}</h3>
                <p className="text-gray-400">{selectedTool.company}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">{selectedTool.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">주요 기능</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTool.features.map((feature, i) => (
                  <span key={i} className="bg-white/10 text-gray-200 px-3 py-1.5 rounded-lg text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-400 text-sm">난이도</span>
                <span className={`text-sm font-medium ${
                  selectedTool.difficulty === '쉬움' ? 'text-green-400' :
                  selectedTool.difficulty === '보통' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {selectedTool.difficulty === '쉬움' ? '⭐ 쉬움' : selectedTool.difficulty === '보통' ? '⭐⭐ 보통' : '⭐⭐⭐ 어려움'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-400 text-sm">가격</span>
                <span className="text-white text-sm font-medium">{selectedTool.price}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-400 text-sm">유형</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedTool.category === 'ai' ? 'bg-purple-500/20 text-purple-300' :
                  selectedTool.category === 'editor' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {selectedTool.category === 'ai' ? 'AI 영상 생성' : selectedTool.category === 'editor' ? '전문 편집 도구' : '간편 도구'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 text-sm">추천</span>
                <span className="text-white text-sm">{selectedTool.bestFor}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
