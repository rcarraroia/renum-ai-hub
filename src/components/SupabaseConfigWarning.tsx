
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SupabaseConfigWarning() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-yellow-700">
            Configuração Necessária
          </CardTitle>
          <CardDescription>
            O Supabase precisa ser configurado para usar a autenticação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Para usar o Renum, você precisa conectar seu projeto ao Supabase. 
              Clique no botão verde "Supabase" no canto superior direito da interface do Lovable.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Settings className="h-4 w-4" />
            <span>Configuração em desenvolvimento</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
