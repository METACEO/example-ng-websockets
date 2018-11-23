import {AngularClientModel} from '../models';

export interface AppStateInterface {
    clients: AngularClientModel[];
    id: string;
    userNumber: string;
    websocketConnected: boolean;
}
