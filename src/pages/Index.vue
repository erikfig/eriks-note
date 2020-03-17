<template>
  <q-page padding>
    <q-editor v-model="editor"/>
  </q-page>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'PageIndex',
  data() {
    return {
      editor: '',
      data: {},
      debounce: null,
    };
  },
  computed: {
    note() {
      return this.$store.state.notes.note;
    },
  },
  watch: {
    editor() {
      this.debounce();
    },
    note(val) {
      if (val) {
        this.data = { ...val };
        this.editor = val.body || '';
      }
    },
  },
  methods: {
    async createOrUpdate() {
      if (!this.editor) {
        return;
      }

      this.data.body = this.editor;

      if (!this.data.id) {
        const id = await this.$store.dispatch('notes/create', this.data);
        this.data.id = id;
      } else {
        const data = { ...this.data };
        this.$store.dispatch('notes/update', data);
      }
    },
  },
  created() {
    this.debounce = _.debounce(this.createOrUpdate, 300);
  },
};
</script>
