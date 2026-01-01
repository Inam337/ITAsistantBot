import type { BotSolution } from '../types'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from './PageHeader'
import { TEXT, COLOR_CLASSES, GRADIENTS, ANIMATION_DELAYS } from '../common/app-constants'

interface SolutionDetailProps {
  solution: BotSolution
  isCustom: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export const SolutionDetail = ({ solution, isCustom, onEdit, onDelete }: SolutionDetailProps) => {
  const navigate = useNavigate()

  const parts = solution.description.split(/\d+\)\s*/)
  const steps = parts.filter(part => part.trim().length > 0)

  return (
    <div className={`min-h-screen ${COLOR_CLASSES.bgGradient} animate-fadeIn pt-16`}>
      <div className="container mx-auto px-4 py-4 max-w-6xl">
       

        <div className="max-w-4xl mx-auto">
           <PageHeader 
          showBackButton={true}
          onBackClick={() => navigate('/')}
        />
          <div className={`${COLOR_CLASSES.bgCard} rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl`}>
          <div className={`bg-gradient-to-r ${GRADIENTS.header} px-5 py-4 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700/50 via-purple-600/50 to-green-600/50 opacity-20"></div>
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-xl font-bold mb-1 drop-shadow-lg bg-gradient-to-r from-white via-purple-100 to-green-100 bg-clip-text text-transparent">{solution.title}</h1>
                  <p className="text-xs bg-gradient-to-r from-white/90 via-purple-50/90 to-green-50/90 bg-clip-text text-transparent">{solution.problem_statement}</p>
                </div>
                {isCustom && onEdit && onDelete && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={onEdit}
                      className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      title="Edit solution"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={onDelete}
                      className="p-1.5 bg-white/20 hover:bg-red-500/50 rounded-lg transition-colors"
                      title="Delete solution"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-5 py-4">
            <div className="mb-4">
              <h2 className={`text-lg font-semibold ${COLOR_CLASSES.textPrimary} mb-3 flex items-center gap-2`}>
                <svg className={`w-5 h-5 ${COLOR_CLASSES.textGradient}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {TEXT.solutionSteps}
              </h2>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-2.5 bg-gradient-to-r ${GRADIENTS.card} rounded-lg p-3 border border-purple-100 hover:border-purple-300 transition-all transform hover:scale-[1.01]`}
                    style={{ animationDelay: `${index * ANIMATION_DELAYS.step}ms` }}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br ${GRADIENTS.step} text-white rounded-full flex items-center justify-center font-semibold text-xs shadow-md`}>
                      {index + 1}
                    </div>
                    <p className={`${COLOR_CLASSES.textPrimary} text-xs leading-relaxed flex-1 pt-0.5`}>
                      {step.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-purple-50 rounded-lg border border-green-200 shadow-sm">
              <p className="text-green-800 text-xs flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{solution.action.next_step}</span>
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id={`tagGradient-${solution.title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9333ea" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke={`url(#tagGradient-${solution.title.replace(/\s+/g, '-')})`} fill="none" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className={`text-sm font-semibold ${COLOR_CLASSES.textGradient}`}>{TEXT.relatedKeywords}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {solution.action.trigger.map((trigger, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-50 via-green-50 to-purple-50 text-purple-700 rounded-lg text-xs font-medium border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all duration-200 transform hover:scale-105 cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

