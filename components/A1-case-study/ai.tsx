import { createAI } from '@ai-sdk/rsc';
import {ClientMessage, HomeDecoratorAction, ServerMessage} from './home-decorator.action';

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    HomeDecoratorAction,
  },
  initialAIState: [],
  initialUIState: [],
});
