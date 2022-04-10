/* eslint-disable no-extra-boolean-cast */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useMemo } from 'react';

import { authorize, refresh, revoke, prefetchConfiguration } from 'react-native-app-auth';
import { UIManager, Alert, Button, Form,Text, FormLabel, Label,TextInput,View } from 'react-native';


const configs = {
  identityserver: {
    issuer: 'https://demo.identityserver.io',
    clientId: 'interactive.public',
    redirectUrl: 'io.identityserver.demo:/oauthredirect',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'offline_access'],

    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
    //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
    //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
    // }
  },
  auth0: {
    // From https://openidconnect.net/
    issuer: 'https://samples.auth0.com',
    clientId: 'kbyuFDidLLm280LIwVFiazOqjO3ty8KH',
    redirectUrl: 'https://openidconnect.net/callback',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'phone', 'address'],

    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://samples.auth0.com/authorize',
    //   tokenEndpoint: 'https://samples.auth0.com/oauth/token',
    //   revocationEndpoint: 'https://samples.auth0.com/oauth/revoke'
    // }
  }
};

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: ''
};

const Login = () => {
  const [authState, setAuthState] = useState(defaultAuthState);
  React.useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      connectionTimeoutSeconds: 5,
      ...configs.identityserver,
    });
  }, []);

  const handleAuthorize = useCallback(
    async provider => {
      try {
        const config = configs[provider];
        const newAuthState = await authorize({
          ...config,
          connectionTimeoutSeconds: 5,
        });

        setAuthState({
          hasLoggedInOnce: true,
          provider: provider,
          ...newAuthState
        });
      } catch (error) {
        Alert.alert('Failed to log in', error.message);
      }
    },
    []
  );

  const handleRefresh = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      const newAuthState = await refresh(config, {
        refreshToken: authState.refreshToken
      });

      setAuthState(current => ({
        ...current,
        ...newAuthState,
        refreshToken: newAuthState.refreshToken || current.refreshToken
      }))

    } catch (error) {
      Alert.alert('Failed to refresh token', error.message);
    }
  }, [authState]);

  const handleRevoke = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      await revoke(config, {
        tokenToRevoke: authState.accessToken,
        sendClientId: true
      });

      setAuthState({
        provider: '',
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: ''
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  }, [authState]);

  const showRevoke = useMemo(() => {
    if (authState.accessToken) {
      const config = configs[authState.provider];
      if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
        return true;
      }
    }
    return false;
  }, [authState]);

  return (
    <View>
      {!!authState.accessToken ? (
        <Form>
          <Label>accessToken</Label>
          <Text>{authState.accessToken}</Text>
          <Label>accessTokenExpirationDate</Label>
          <Text>{authState.accessTokenExpirationDate}</Text>
          <Label>refreshToken</Label>
          <Text>{authState.refreshToken}</Text>
          <Label>scopes</Label>
          <Text>{authState.scopes.join(', ')}</Text>
        </Form>
      ) : (
        <Text>{authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Text>
      )}

      <View>
        {!authState.accessToken ? (
          <>
            <Button
              onPress={() => handleAuthorize('identityserver')}
              text="Authorize IdentityServer"
              color="#DA2536"
            />
            <Button
              onPress={() => handleAuthorize('auth0')}
              text="Authorize Auth0"
              color="#DA2536"
            />
          </>
        ) : null}
        {!!authState.refreshToken ? (
          <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
        ) : null}
        {showRevoke ? (
          <Button onPress={handleRevoke} text="Revoke" color="#EF525B" />
        ) : null}
      </View>
    </View>
  );
}
export default Login;
//npm install --save-dev "babel-core@^7.0.0-bridge.0" 