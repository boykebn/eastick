import React from 'react';
import PushNotification from 'react-native-push-notification';
import Main from './src/screens/Main';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './src/redux/store';

PushNotification.getChannels(function (channel_ids) {
  console.log(channel_ids); // ['channel_id_1']
});

PushNotification.createChannel({
  channelId: 'global_notif', // (required)
  channelName: 'Global Notification', // (required)
});

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', JSON.stringify(token));
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
