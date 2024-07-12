export class ServerConfig {
    private static readonly serverApi:string="http://localhost:8083";

    public static concatBackendAPI(router:string){
        return this.serverApi.concat(router);
    }
}
