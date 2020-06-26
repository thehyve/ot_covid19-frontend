import PouchDB from 'pouchdb-browser';
import pouchDBFind from 'pouchdb-find';

PouchDB.plugin(pouchDBFind);

const openDB = () => new PouchDB('covid');

export default openDB;
