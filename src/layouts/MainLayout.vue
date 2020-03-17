<template>
  <q-layout view="lHh lpR fFf">

    <q-header class="bg-grey-9 text-white q-electron-drag">
      <q-toolbar>
        <q-btn dense flat round icon="menu"
          @click="left = !left" />

        <q-toolbar-title>
          Erik's Note
        </q-toolbar-title>

        <q-btn dense flat round icon="note_add"
          @click="create" />
        <q-btn dense flat icon="minimize" @click="minimize" class="electron-only" />
        <q-btn dense flat icon="crop_square" @click="maximize" class="electron-only" />
        <q-btn dense flat icon="close" @click="closeApp" class="electron-only" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left">
      <sidebar-left></sidebar-left>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import SideBarLeft from '../components/SidebarLeft';

export default {
  components: {
    'sidebar-left': SideBarLeft,
  },
  data() {
    return {
      left: false,
      right: false,
    };
  },
  methods: {
    create() {
      this.$store.dispatch('notes/get', null);
    },
    minimize() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize();
      }
    },
    maximize() {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow();

        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
      }
    },
    closeApp() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close();
      }
    },
  },
  mounted() {
    this.$q.dark.set(true);
    this.$store.dispatch('notes/all');
  },
};
</script>
