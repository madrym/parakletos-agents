import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'notes',
      columns: [
        {name: 'user_id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'content', type: 'string'},
        {name: 'tags', type: 'string'}, // JSON array
        {name: 'timestamps', type: 'string'}, // JSON array
        {name: 'audio_ref', type: 'string', isOptional: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'synced_at', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'tags',
      columns: [
        {name: 'user_id', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'value', type: 'string'},
        {name: 'color', type: 'string', isOptional: true},
        {name: 'usage_count', type: 'number'},
        {name: 'created_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'prayers',
      columns: [
        {name: 'user_id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'content', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'tags', type: 'string'}, // JSON array
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'answered_at', type: 'number', isOptional: true},
        {name: 'reminder_date', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'study_sessions',
      columns: [
        {name: 'user_id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'description', type: 'string', isOptional: true},
        {name: 'passage', type: 'string', isOptional: true}, // JSON object
        {name: 'questions', type: 'string'}, // JSON array
        {name: 'responses', type: 'string'}, // JSON array
        {name: 'is_public', type: 'boolean'},
        {name: 'share_token', type: 'string', isOptional: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'bible_verse_notes',
      columns: [
        {name: 'user_id', type: 'string'},
        {name: 'book', type: 'string'},
        {name: 'chapter', type: 'number'},
        {name: 'verse', type: 'number'},
        {name: 'note', type: 'string'},
        {name: 'highlight_color', type: 'string', isOptional: true},
        {name: 'tags', type: 'string'}, // JSON array
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'audio_recordings',
      columns: [
        {name: 'user_id', type: 'string'},
        {name: 'note_id', type: 'string', isOptional: true},
        {name: 'filename', type: 'string'},
        {name: 'duration', type: 'number'},
        {name: 'file_size', type: 'number'},
        {name: 's3_key', type: 'string', isOptional: true},
        {name: 'local_path', type: 'string', isOptional: true},
        {name: 'uploaded_at', type: 'number', isOptional: true},
        {name: 'created_at', type: 'number'},
      ],
    }),
  ],
}); 