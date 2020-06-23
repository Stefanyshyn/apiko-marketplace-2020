import { createAsyncActions } from '@letapp/redux-actions';

export const fetchViewer = createAsyncActions('viewer/FETCH_VIEWER');

export const saveViewer = createAsyncActions('viewer/SAVE_VIEWER');
