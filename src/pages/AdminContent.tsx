import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Globe, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminSessionValidator } from '@/lib/adminSessionValidator';

interface SiteContent {
  id: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
}

const AdminContent = () => {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const contentSections = {
    hero: {
      title: 'Seção Hero (Principal)',
      fields: [
        { key: 'hero_title', label: 'Título Principal', type: 'text' },
        { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea' },
        { key: 'hero_cta_text', label: 'Texto do Botão', type: 'text' },
        { key: 'hero_cta_link', label: 'Link do Botão', type: 'text' }
      ]
    },
    about: {
      title: 'Seção Sobre Nós',
      fields: [
        { key: 'about_title', label: 'Título', type: 'text' },
        { key: 'about_description', label: 'Descrição', type: 'textarea' },
        { key: 'about_feature_1', label: 'Característica 1', type: 'text' },
        { key: 'about_feature_2', label: 'Característica 2', type: 'text' },
        { key: 'about_feature_3', label: 'Característica 3', type: 'text' }
      ]
    },
    contact: {
      title: 'Informações de Contato',
      fields: [
        { key: 'contact_phone', label: 'Telefone', type: 'text' },
        { key: 'contact_whatsapp', label: 'WhatsApp', type: 'text' },
        { key: 'contact_email', label: 'E-mail', type: 'text' },
        { key: 'contact_address', label: 'Endereço', type: 'textarea' }
      ]
    },
    footer: {
      title: 'Rodapé',
      fields: [
        { key: 'footer_description', label: 'Descrição da Empresa', type: 'textarea' },
        { key: 'footer_copyright', label: 'Copyright', type: 'text' }
      ]
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await AdminSessionValidator.isValidSession();
      if (!isValid) {
        navigate('/admin/login');
        return;
      }
      fetchContent();
    };
    checkAuth();
  }, [navigate]);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('section');

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o conteúdo do site.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getContentValue = (section: string, key: string) => {
    const item = content.find(c => c.section === section && c.content_key === key);
    return item?.content_value || '';
  };

  const updateContentValue = (section: string, key: string, value: string) => {
    setContent(prev => {
      const existing = prev.find(c => c.section === section && c.content_key === key);
      if (existing) {
        return prev.map(c => 
          c.section === section && c.content_key === key 
            ? { ...c, content_value: value }
            : c
        );
      } else {
        return [...prev, {
          id: `temp-${Date.now()}`,
          section,
          content_key: key,
          content_value: value,
          content_type: 'text'
        }];
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Delete all existing content and recreate
      await supabase.from('site_content').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert all content
      const contentToInsert = content.map(({ id, ...item }) => ({
        section: item.section,
        content_key: item.content_key,
        content_value: item.content_value,
        content_type: item.content_type || 'text'
      }));

      if (contentToInsert.length > 0) {
        const { error } = await supabase
          .from('site_content')
          .insert(contentToInsert);
        
        if (error) throw error;
      }

      toast({
        title: "Sucesso",
        description: "Conteúdo do site atualizado com sucesso!"
      });
      
      fetchContent(); // Refresh to get proper IDs
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o conteúdo.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
          <p className="mt-4 text-gray-600">Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => navigate('/admin')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Editar Conteúdo do Site</h1>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">Conteúdo do Site</h2>
          </div>
          <p className="text-gray-600">
            Edite os textos e informações que aparecem no site principal.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(contentSections).map(([sectionKey, section]) => (
            <Card key={sectionKey}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <Label htmlFor={field.key}>{field.label}</Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.key}
                        value={getContentValue(sectionKey, field.key)}
                        onChange={(e) => updateContentValue(sectionKey, field.key, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={field.key}
                        value={getContentValue(sectionKey, field.key)}
                        onChange={(e) => updateContentValue(sectionKey, field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image className="w-5 h-5" />
                <span>Imagens e Logos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Como alterar imagens:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>1. Faça upload da nova imagem pelo chat principal</li>
                  <li>2. Solicite ao assistente para atualizar a imagem específica</li>
                  <li>3. As imagens são armazenadas em /public/lovable-uploads/</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-900 mb-2">💡 Dica</h3>
          <p className="text-sm text-yellow-800">
            Após salvar as alterações, as mudanças aparecerão imediatamente no site principal. 
            Certifique-se de revisar o conteúdo antes de salvar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;