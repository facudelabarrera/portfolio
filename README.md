# Facu - Portfolio Personal

Portfolio web moderno y minimalista para Facu, diseñador UX/UI freelance, construido con React, Tailwind CSS, Framer Motion y Supabase.

## 🚀 Características

- **Diseño Moderno**: Estilo minimalista con paleta oscura y acentos púrpura
- **Animaciones Fluidas**: Implementado con Framer Motion para transiciones suaves
- **Responsive**: Mobile-first design optimizado para todos los dispositivos
- **Backend Dinámico**: Powered by Supabase para gestión de contenido
- **Formulario Funcional**: Contacto directo con almacenamiento en base de datos
- **Analytics**: Tracking de visitantes y pageviews
- **Admin Panel**: Gestión de proyectos en tiempo real
- **Demo Mode**: Funciona sin configuración con datos de muestra

## 🛠️ Tecnologías

- **Frontend**: React, TypeScript, Tailwind CSS
- **Animaciones**: Framer Motion
- **Backend**: Supabase (Database, Auth, Storage)
- **Componentes**: shadcn/ui
- **Iconos**: Lucide React
- **Tipografía**: Geist Font

## 🚀 Inicio Rápido

### Demo Mode (Sin Configuración)
El portfolio funciona inmediatamente en modo demo con datos de muestra:

```bash
# El portfolio ya está listo para usar
# Solo abre el archivo o ejecuta en tu servidor favorito
```

### Configuración Completa con Supabase

#### 1. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto
2. Ve a Settings > API en tu dashboard de Supabase
3. Copia tu "Project URL" y "anon public" API key

#### 2. Actualizar Configuración

Edita el archivo `/lib/supabase.ts` y reemplaza las credenciales:

```typescript
// Reemplaza estos valores con tus credenciales reales
const supabaseUrl = 'TU_URL_DE_SUPABASE'  // ej: https://xyz.supabase.co
const supabaseAnonKey = 'TU_CLAVE_ANONIMA' // tu clave anon pública
```

#### 3. Configurar Base de Datos

En el SQL Editor de Supabase, ejecuta este código para crear las tablas:

```sql
-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  project_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page Views Table for Analytics
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample projects
INSERT INTO projects (title, description, image_url, tags, category, featured, order_index) VALUES
('E-commerce Platform', 'Complete redesign of a B2B e-commerce platform focusing on user experience and conversion optimization.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', '{"UX/UI Design", "E-commerce", "B2B"}', 'Web Design', true, 1),
('Fintech Mobile App', 'Mobile banking app design with focus on security, accessibility, and seamless user experience.', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop', '{"Mobile Design", "Fintech", "iOS"}', 'Mobile App', true, 2),
('SaaS Dashboard', 'Comprehensive dashboard design for a project management SaaS with complex data visualization.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', '{"Dashboard", "SaaS", "Data Viz"}', 'Web App', true, 3);

-- Row Level Security (RLS) Policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);

-- Allow public insert for contact messages and page views
CREATE POLICY "Public can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert page views" ON page_views FOR INSERT WITH CHECK (true);
```

#### 4. Verificar Configuración

Una vez configurado:
- ✅ El formulario de contacto almacenará mensajes reales
- ✅ Los proyectos se cargarán desde la base de datos
- ✅ Analytics funcionará correctamente
- ✅ El panel admin estará completamente funcional

## 📋 Funcionalidades

### 📧 Formulario de Contacto
- **Demo Mode**: Simula envío sin configuración
- **Live Mode**: Almacena mensajes en Supabase
- Validación en tiempo real
- Estados de loading y error
- Confirmación visual de envío

### 📁 Gestión de Proyectos
- **Demo Mode**: Muestra proyectos de ejemplo
- **Live Mode**: Carga desde Supabase con fallback
- Ordenamiento personalizable
- Soporte para proyectos destacados
- Panel admin para gestión CRUD

### 📊 Analytics
- **Demo Mode**: Log en consola
- **Live Mode**: Tracking automático de pageviews
- Información de user agent y referrer
- Navegación dentro de la página

### ⚙️ Panel de Administración
- Acceso rápido con `Ctrl+Shift+A`
- CRUD completo de proyectos
- Interface intuitiva
- Actualización en tiempo real
- Solo funciona en Live Mode

## 🎨 Personalización

### Colores
Los colores principales están definidos en `/styles/globals.css`:
```css
--primary: #7746d7; /* Púrpura principal */
--background: #000000; /* Fondo negro */
--foreground: #ffffff; /* Texto blanco */
```

### Contenido
- **Hero**: Editar en `/components/Hero.tsx`
- **About**: Editar en `/components/About.tsx`
- **Services**: Editar en `/components/Services.tsx`
- **Proyectos**: 
  - Demo Mode: Editar `FALLBACK_PROJECTS` en `/hooks/useSupabase.ts`
  - Live Mode: Gestionar desde Supabase o panel admin
- **Contacto**: Configuración en `/components/Contact.tsx`

### Configuración de Supabase

Para cambiar entre Demo Mode y Live Mode:

```typescript
// En /lib/supabase.ts
const supabaseUrl = 'TU_URL_AQUI'     // Cambiar por tu URL real
const supabaseAnonKey = 'TU_CLAVE_AQUI' // Cambiar por tu clave real
```

## 🔍 Estados de la Aplicación

### Demo Mode (Por Defecto)
- ✨ Funciona inmediatamente sin configuración
- 📝 Formulario simula envío
- 💾 Proyectos desde datos estáticos
- 📊 Analytics en consola
- 🔧 Panel admin deshabilitado

### Live Mode (Con Supabase)
- 🚀 Funcionalidad completa
- 📨 Formulario almacena en base de datos
- 🔄 Proyectos dinámicos con fallback
- 📈 Analytics reales
- ⚙️ Panel admin funcional

## 🔒 Seguridad

- Row Level Security (RLS) habilitado en Supabase
- Validación de formularios en frontend y backend
- Políticas de acceso granulares
- Configuración segura por defecto

## 📱 Mobile-First

El diseño está optimizado para móviles:
- Navegación responsive con menú hamburguesa
- Grid adaptativo para proyectos
- Formularios optimizados para touch
- Animaciones performantes en móviles

## 🚨 Solución de Problemas

### Error: "process is not defined"
✅ **Solucionado**: El portfolio ahora funciona en modo demo sin configuración

### Formulario no envía mensajes
- Verifica que hayas configurado correctamente las credenciales en `/lib/supabase.ts`
- Asegúrate de haber ejecutado el SQL de inicialización en Supabase
- En demo mode, el formulario simula el envío

### Proyectos no cargan
- El portfolio siempre mostrará proyectos (modo demo o live)
- Si hay error de conexión, se usa automáticamente el fallback

### Panel admin no funciona
- Solo disponible en Live Mode con Supabase configurado
- Usar `Ctrl+Shift+A` para abrir

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Creado con ❤️ por Facu** - Diseñador UX/UI apasionado por crear experiencias digitales excepcionales.

### Próximos Pasos Sugeridos:
1. 🎨 Personalizar el contenido con tu información real
2. 🖼️ Reemplazar las imágenes de muestra con tus proyectos
3. 🔧 Configurar Supabase para funcionalidad completa
4. 📱 Probar en diferentes dispositivos
5. 🚀 Desplegar a tu plataforma favorita