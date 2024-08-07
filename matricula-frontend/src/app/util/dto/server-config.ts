export class ServerConfig {
    private static readonly serverApi:string="https://matricula-backend-vghi.onrender.com";

    public static concatBackendAPI(router:string){
        return this.serverApi.concat(router);
    }
}
