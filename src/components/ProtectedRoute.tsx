
import { useAuth } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { SupabaseConfigWarning } from './SupabaseConfigWarning'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, isConfigured } = useAuth()

  if (!isConfigured) {
    return <SupabaseConfigWarning />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Carregando...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
