import { useEffect, useState } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useAccount, useSignMessage } from 'wagmi';

import { useLogin } from '@/providers/auth/hooks';
import { hasuraPublicSDK } from '@/services/hasura/api';

export type Step =
  | 'GET_ACCOUNT'
  | 'GET_NONCE'
  | 'GET_SIGNATURE'
  | 'GET_TOKEN'
  | 'FINISHED';

/*
Get nonce -> sign message -> login using wallet and signature
*/
export function useConnectWallet() {
  const [step, setStep] = useState<Step>('GET_NONCE');
  const [error, setError] = useState<{
    message: any;
    label: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
  }>();

  const signIn = useLogin();

  const sign = useSignMessage();
  const { address, isConnected } = useAccount();

  /* Handles nonce generation */
  const nonce = useQuery(
    ['nonce', address],
    () => hasuraPublicSDK.get_nonce({ wallet: address! }),
    {
      enabled: isConnected && !!address && step === 'GET_NONCE',
      async onSuccess({ get_nonce }) {
        const { nonce } = get_nonce!;
        setStep('GET_SIGNATURE');
        sendSignature.mutate(nonce);
      },
      onError(e: any) {
        setError({
          message: e?.response?.errors?.[0]?.message,
          label: 'Try again',
        });
      },
    }
  );

  /* Handles wallet signature */
  const sendSignature = useMutation(
    (nonce: number) =>
      sign.signMessageAsync({
        message: `Welcome to Gateway!\n\nPlease sign this message for access: ${nonce}`,
      }),
    {
      async onSuccess(signature) {
        setStep('GET_TOKEN');
        const res = await signIn.mutateAsync({
          wallet: address!,
          signature,
        });
        setStep('FINISHED');
      },
      onError(e: any) {
        setError({
          message: e.message,
          label: 'Try again',
        });
      },
      retry: false,
    }
  );

  const onReset = () => {
    setStep('GET_NONCE');
    setError(undefined);
    nonce.remove();
    sign.reset();
    signIn.reset();
  };

  return {
    step,
    error,
    isLoading: step !== 'FINISHED' && !error,
    onReset,
  };
}
