# Gestión de Inventario de Cultivos

Esta aplicación es una herramienta para la gestión de inventario y reportes diarios de cultivos. Permite a los usuarios añadir, editar y eliminar plantas, así como ver detalles y mantener un historial de cambios.

## Características

- **Añadir Plantas**: Permite añadir nuevas plantas al inventario con detalles como fecha de ingreso, nombre, genética, etapa, tamaño de la maceta, y más.
- **Editar Plantas**: Permite editar los detalles de las plantas existentes, incluyendo campos avanzados como último riego y fecha estimada de cambio.
- **Ver Detalles**: Permite ver los detalles completos de una planta seleccionada.
- **Historial de Cambios**: Mantiene un historial de cambios para cada planta, registrando las modificaciones realizadas.
- **Eliminar Plantas**: Permite eliminar plantas del inventario.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos de frontend.
- **UUID**: Biblioteca para generar identificadores únicos universales.
- **LocalStorage**: Almacenamiento web para persistir datos en el navegador.

## Instalación

1. Clona el repositorio:
   ````bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO> ```

   ````
2. Instala las dependencias:
   ``npm install`

## Uso

1. Inicia la aplicacion;
   `npm run dev`
2. Abre tu navegador y navega a http://localhost:3000 para ver la aplicación en funcionamiento

## Estructura del Proyecto

- src/components: Contiene los componentes de React utilizados en la aplicación.
  -- AddPlant.jsx: Componente para añadir nuevas plantas.
  -- EditPlant.jsx: Componente para editar los detalles de una planta.
  -- PlantDetails.jsx: Componente para ver los detalles de una planta.
  -- PlantHistory.jsx: Componente para ver el historial de cambios de una planta.
  -- PlantList.jsx: Componente para mostrar la lista de plantas en el inventario.
- src/context: Contiene el contexto de React para la gestión del estado global.
  -- PlantContext.jsx: Proveedor del contexto de plantas.
- src/utils: Contiene utilidades y funciones auxiliares.
  -- translations.js: Función para traducir los nombres de los campos.
