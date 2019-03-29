import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { mainActions } from '../actions';
import { MainModel } from '../models/MainModel';
import * as pbActions from '../../lib/local/pbActions';

const initialState: RootState.mainState = {
  responseDisplay: 'eggplant 🍆',
  responseMetrics: 'string',
  targetIP: '',
  filePath: '',
  trail: 'eggplant',
  connectType: 'lol',
  mode: 'service',
  serviceList: ['testService'],
  requestList: ['testRequest'],
  packageDefinition: null
};

export const mainReducer = handleActions<RootState.mainState, MainModel>(
  {
    [mainActions.Type.HANDLE_IP_INPUT]: (state, action) => ({
      ...state,
      targetIP: action.payload
    }),
    [mainActions.Type.HANDLE_PROTO_UPLOAD]: (state, action) => {
      const filePath = action.payload[0].path;
      const packageDefinition = pbActions.loadProtoFile(filePath);
      const { protoServices, protoMessages } = pbActions.parsePackageDefinition(
        packageDefinition
      );

      return {
        ...state,
        filePath: filePath,
        packageDefinition: packageDefinition,
        serviceList: protoServices,
        requestList: protoMessages
      };
    },
    [mainActions.Type.HANDLE_SET_MODE]: (state, action) => ({
      ...state,
      mode: action.payload
    })
  },
  initialState
);
