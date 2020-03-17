<template>
  <div>
    <q-list v-if="notes.length > 0">
      <q-item
        clickable
        v-for="(note, i) in notes"
        :key="i"
        @click="setNote(note)"
      >
        <q-item-section>
          <q-item-label>{{ note.body | truncate }}</q-item-label>
          <q-item-label caption>Criado em {{ note.created | formatDate }}</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-btn size="12px"
              flat dense round icon="delete" @click="deleteNote(note)" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-list v-if="notes.length === 0">
      <q-item>
        <q-item-section>
          <q-item-label>Nenhuma nota encontrada</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { date } from 'quasar';

export default {
  computed: {
    notes() {
      return this.$store.state.notes.notes;
    },
  },
  filters: {
    truncate(input) {
      input = input.replace(/(&nbsp;)/g, ' ');
      if (input.length > 15) {
        return `${input.substring(0, 15).trim()}...`;
      }
      return input;
    },
    formatDate(input) {
      return date.formatDate(input, 'DD/MM/YYYY HH:mm');
    },
  },
  methods: {
    setNote(note) {
      this.$store.dispatch('notes/get', note.id);
    },
    deleteNote(note) {
      this.$q.dialog({
        title: 'Tem certeza que quer remover',
        message: 'Esta ação não poderá ser desfeita?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await this.$store.dispatch('notes/remove', note.id);
        this.$store.dispatch('notes/get', null);
      });
    },
  },
};
</script>
