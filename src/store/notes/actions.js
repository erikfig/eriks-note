import Vue from 'vue';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

function toJson(data) {
  return JSON.parse(data);
}

function toString(data) {
  return JSON.stringify(data);
}

function getAll() {
  let notes = '[]';
  if (process.env.MODE === 'electron') {
    const { ipcRenderer } = Vue.prototype.$q.electron;
    notes = ipcRenderer.sendSync('get-notes');
  } else {
    notes = window.localStorage.getItem('notes') || '[]';
  }
  return toJson(notes);
}

function setAll(notes) {
  notes = toString(notes);
  if (process.env.MODE === 'electron') {
    const { ipcRenderer } = Vue.prototype.$q.electron;
    ipcRenderer.send('set-notes', notes);
  } else {
    window.localStorage.setItem('notes', notes);
  }
}

function getById(id) {
  const notes = getAll();
  const note = _.find(notes, (o) => o.id === id);

  return note || {};
}

export function all(context) {
  context.commit('updateNotes', getAll());
}

export function get(context, id) {
  const note = getById(id);
  context.commit('updateNote', note);
}

export function create(context, data) {
  data = { ...data };
  const notes = getAll();

  data.id = uuidv4();
  data.created = Date.now();

  notes.push(data);
  setAll(notes);

  context.commit('updateNotes', notes);
  return data.id;
}

export function update(context, data) {
  data = { ...data };

  const notes = getAll();
  let note = getById(data.id);
  delete data.id;

  note = _.merge(note, data);
  const noteKey = _.findKey(notes, (o) => o.id === note.id);

  notes[noteKey] = note;
  setAll(notes);

  context.commit('updateNotes', notes);
}

export function remove(context, id) {
  const notes = getAll();
  const noteKey = _.findKey(notes, (o) => o.id === id);

  notes.splice(noteKey, 1);
  setAll(notes);

  context.commit('updateNotes', notes);
}
