<script lang="ts" setup>
useSeoMeta({
  title: 'Teamspaces Online for Chrome — Privacy Policy',
  description: 'Privacy Policy for the Teamspaces Online Chrome extension.',
  ogTitle: 'Teamspaces Online for Chrome — Privacy Policy',
  ogDescription: 'Privacy Policy for the Teamspaces Online Chrome extension.'
})

const lang = ref<'en' | 'es'>('en')
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center justify-end gap-2 mb-6">
      <button
        type="button"
        class="px-3 py-1.5 text-sm rounded-md border transition-colors"
        :class="lang === 'en' ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white' : 'border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'"
        @click="lang = 'en'"
      >
        English
      </button>
      <button
        type="button"
        class="px-3 py-1.5 text-sm rounded-md border transition-colors"
        :class="lang === 'es' ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white' : 'border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'"
        @click="lang = 'es'"
      >
        Español
      </button>
    </div>

    <div v-if="lang === 'en'">
      <h1 class="text-4xl font-bold mb-4">Teamspaces Online for Chrome — Privacy Policy</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-8">Last updated: November 12, 2026</p>

      <p class="mb-6">
        Teamspaces Online for Chrome ("the extension") lets you organize, search and open your links (quick links) grouped in spaces.
      </p>

      <p class="mb-6">
        <strong>Your data stays in your browser.</strong> Spaces, sections and quick links are stored only on your computer, in a database inside your browser (IndexedDB). The extension has no account, no sign-up and no server. We do not collect, receive, sell or share your data.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What the extension stores locally</h2>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2">The spaces, sections and quick links you create (names, URLs, order, click counts).</li>
        <li class="mb-2">Small settings: light or dark theme, and the last space you opened.</li>
        <li class="mb-2">Links you save from the context menu or the keyboard shortcut, until the extension adds them to a space.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">The current tab</h2>
      <p class="mb-6">
        When you open the extension's popup or press its save shortcut, the extension reads the title and URL of the current tab so you can save it. It does not read the content of pages and has no access to other tabs.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">External requests</h2>
      <p class="mb-6">
        To show each link's icon, the extension requests the favicon from Google's favicon service (<code>www.google.com/s2/favicons</code>) with the link's domain (for example <code>github.com</code>), not the full URL. Google's privacy policy applies to that request. The extension makes no other network requests. The "Try the web app" link opens our web app only if you click it.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Deleting your data</h2>
      <p class="mb-6">
        Removing the extension deletes all its data from your browser. You can also delete spaces at any time from the extension.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Changes</h2>
      <p class="mb-6">
        If this policy changes (for example, when optional sign-in or sync is added), we will update this page and the date above before releasing that version.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Who is responsible</h2>
      <p class="mb-6">
        The extension is published by Miguel Olave, as an individual trader.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Contact</h2>
      <p class="mb-6">
        <a href="mailto:contact@teamspaces.online" class="text-blue-600 hover:underline">contact@teamspaces.online</a>
      </p>
    </div>

    <div v-else>
      <h1 class="text-4xl font-bold mb-4">Teamspaces Online para Chrome — Política de privacidad</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-8">Última actualización: 12 de noviembre de 2026</p>

      <p class="mb-6">
        Teamspaces Online para Chrome ("la extensión") te permite organizar, buscar y abrir tus enlaces (quick links) agrupados en spaces.
      </p>

      <p class="mb-6">
        <strong>Tus datos se quedan en tu navegador.</strong> Los spaces, las secciones y los quick links se guardan solo en tu computador, en una base de datos dentro del navegador (IndexedDB). La extensión no tiene cuenta, registro ni servidor. No recopilamos, recibimos, vendemos ni compartimos tus datos.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Qué guarda la extensión en tu navegador</h2>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2">Los spaces, secciones y quick links que creas (nombres, URLs, orden y cantidad de clics).</li>
        <li class="mb-2">Ajustes pequeños: tema claro u oscuro, y el último space que abriste.</li>
        <li class="mb-2">Los enlaces que guardas desde el menú contextual o el atajo de teclado, hasta que la extensión los agrega a un space.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">La pestaña actual</h2>
      <p class="mb-6">
        Cuando abres el popup de la extensión o usas su atajo para guardar, la extensión lee el título y la URL de la pestaña actual para que puedas guardarla. No lee el contenido de las páginas ni accede a otras pestañas.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Consultas externas</h2>
      <p class="mb-6">
        Para mostrar el ícono de cada enlace, la extensión pide el favicon al servicio de Google (<code>www.google.com/s2/favicons</code>) con el dominio del enlace (por ejemplo <code>github.com</code>), no la URL completa. A esa consulta se aplica la política de privacidad de Google. La extensión no hace ninguna otra consulta a internet. El enlace "Try the web app" abre nuestra aplicación web solo si haces clic en él.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Borrar tus datos</h2>
      <p class="mb-6">
        Al quitar la extensión se borran todos sus datos del navegador. También puedes eliminar spaces cuando quieras desde la extensión.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Cambios</h2>
      <p class="mb-6">
        Si esta política cambia (por ejemplo, cuando se agregue inicio de sesión o sincronización opcional), actualizaremos esta página y la fecha de arriba antes de publicar esa versión.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Responsable</h2>
      <p class="mb-6">
        La extensión la publica Miguel Olave, como persona natural que actúa como comerciante.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Contacto</h2>
      <p class="mb-6">
        <a href="mailto:contact@teamspaces.online" class="text-blue-600 hover:underline">contact@teamspaces.online</a>
      </p>
    </div>
  </div>
</template>
