import React from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { Account } from 'thirdweb/wallets';

export let activeAccount: Account | undefined;
const UserInfoHook = () => {
    activeAccount = useActiveAccount();
  return (
    <div>
      activeAccount: {activeAccount ? activeAccount.address : 'No active account'}
    </div>
  )
}

export default UserInfoHook