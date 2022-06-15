enum UserState {
    Disconnected,
    LoggedOut,
    LoggedIn,
    OnBreak,
    Ready,
    OffCall,
    Dialling,
    Dialing,
    OnCall,
}

export default UserState;

export enum Action {
    Connect,
    Disconnect,
    Login,
    Logout,
    Ready,
    MakeCall,
    HangUp,
    Submit,
    RequestBreak,
}

export const isValidAction = (state: UserState, action: Action): boolean => {
    switch (state) {
        case UserState.Disconnected:
            return action === Action.Connect;
        case UserState.LoggedOut:
            return action === Action.Disconnect || action === Action.Login;
        case UserState.LoggedIn:
        case UserState.OnBreak:
            return action === Action.Logout || action === Action.Ready;
        case UserState.Ready:
            return action === Action.RequestBreak;
        case UserState.OffCall:
            return (
                action === Action.MakeCall ||
                action === Action.RequestBreak ||
                action === Action.Submit
            );
        case UserState.Dialling:
        case UserState.Dialing:
            return action === Action.HangUp || action === Action.RequestBreak;
        case UserState.OnCall:
            return (
                action === Action.HangUp ||
                action === Action.RequestBreak ||
                action === Action.Submit
            );
        default:
            return false;
    }
};
