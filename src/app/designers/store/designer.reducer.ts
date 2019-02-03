import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IDesigner } from '../designer.model';
import { DesignerActions, DesignerActionTypes } from './designer.actions';
import { mapDesigners } from '../designers.helper';
import { DbArtist } from 'src/app/shared/artist.model';

export interface DesignersState extends EntityState<IDesigner> {
  allDesignersLoaded: boolean;
  bookmarks: number[];
}

const adapter = createEntityAdapter<IDesigner>();

const initialState: DesignersState = adapter.getInitialState({
  allDesignersLoaded: false,
  bookmarks: []
});

export function designerReducer(state = initialState, action: DesignerActions) {
  switch (action.type) {
    case DesignerActionTypes.DesignerLoaded: {
      const dbDesigner: DbArtist = action.payload.designer;
      const designer: IDesigner = mapDesigners([dbDesigner])[0];
      return adapter.addOne(designer, state);
    }
    case DesignerActionTypes.AllDesignersLoaded: {
      const dbDesigners: DbArtist[] = action.payload.designers;
      const designers: IDesigner[] = mapDesigners(dbDesigners);
      return adapter.addAll(designers, { ...state, allDesignersLoaded: true });
    }
    case DesignerActionTypes.FilteredDesignersLoaded: {
      const dbDesigners: DbArtist[] = action.payload.designers;
      const designers: IDesigner[] = mapDesigners(dbDesigners);
      return adapter.addAll(designers, state);
    }
    default:
      return state;
  }
}

export const { selectAll } = adapter.getSelectors();
