import Web3 from "web3";
import {
    pinkSaleLockContract,
    pinkSaleLockAbi,
    tokenAbi,
    tokenAdress,
} from "../../utilies/Contract";


export const userData = async (_userAddress) => {
    const web3 = window.web3;

    let pinkSaleContract = new web3.eth.Contract(
        pinkSaleLockAbi,
        pinkSaleLockContract
    );

    let _userTokens = await pinkSaleContract.methods.normalLocksForUser(_userAddress).call();



    return { tokens: _userTokens };

}

export const allDataForToken = async (_tokenAddress) => {
    const web3 = await window.web3;

    let pinkSaleContract = await new web3.eth.Contract(
        pinkSaleLockAbi,
        pinkSaleLockContract
    );

    let _totalLockCountForToken = await pinkSaleContract.methods.totalLockCountForToken(_tokenAddress).call();
    let _allDataForToken = await pinkSaleContract.methods.getLocksForToken(_tokenAddress, 0, _totalLockCountForToken).call();
    return _allDataForToken

}

export const allTokensData = async () => {
    const web3 = window.web3;

    let pinkSaleContract = new web3.eth.Contract(
        pinkSaleLockAbi,
        pinkSaleLockContract
    );

    let _tokensCount = await pinkSaleContract.methods.allNormalTokenLockedCount().call();
    let _allTokensArray = await pinkSaleContract.methods.getCumulativeNormalTokenLockInfo(0, _tokensCount).call();
    console.log('_allTokensArray', _allTokensArray)




    return { allTokensArray: _allTokensArray };

}

export const tokenData = async (_tokenAddress) => {
    console.log("token address", _tokenAddress);
    const web3 = window.web3;
    let pinkSaleToken = new web3.eth.Contract(tokenAbi, _tokenAddress);
    let tokenName = await pinkSaleToken.methods.name().call();
    let tokenSymbol = await pinkSaleToken.methods.symbol().call();
    let tokenDecimals = await pinkSaleToken.methods.decimals().call();

    return { tokenName: tokenName, tokenSymbol: tokenSymbol, tokenDecimals: tokenDecimals };

}


