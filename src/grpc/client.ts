import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
const packageDef = protoLoader.loadSync("src/grpc/runvul.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef)
const runVulPackage: any = grpcObject.runvuln;

const client = new runVulPackage.RunVuln(process.env.GRPC_URL, grpc.credentials.createInsecure())

function startScan(victim: string, fullUrl: string) {
    return new Promise((resolve, reject) => client.ScanVuln({
        "victim": victim,
        "full_url": fullUrl
    }, (err: any, response: any) => {
        if (err) {
            return reject(err)
        }
        resolve(response)
    }))

}

export { startScan }

