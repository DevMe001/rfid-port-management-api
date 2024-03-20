type Wallet = {
	wallet_id?: string;
	account_number: number;
	balance: number;
	is_taken: string;
	status: 'pending' | 'approved' | 'rejectected';
	personal_id: string;
};

type WalletDto = Pick<Wallet, keyof Wallet>;

export type { WalletDto };
