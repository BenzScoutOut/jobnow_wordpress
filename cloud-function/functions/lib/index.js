"use strict";
const functions = require('firebase-functions');
const { google } = require("googleapis");
const sheets = google.sheets("v4");
const jwtClient = new google.auth.JWT({
    email: "firebase-adminsdk-yp6da@scout-android-test.iam.gserviceaccount.com",
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgxG+WiSkgPlq6\ndIV26bzDupJ0h+zjmmoPRDmMdZTvLsachjigsyAf+P1/sEHapu8PXQpEtyE37IAR\no7irHKhJCrv8FLJ7pC48W2Bg667TymQQd4ZG7FlXnUHXOchjE0nnZkVr9edQOGQ/\nt+SXPr0CiHX/GlD0wOsdtyE8kCg+Y3OkpW9AfaRBFFNZMxTf2KRq9vCCZHHUo86w\nc1oDC0LTgEXsa/wl25LjG3n+17M+QG2POdUTP267/nX4hR0OprJG/R+563pLtkRm\n/A4H5NWJoz3FBHPnQ5ckE+NDKzoozkZAR8qCxtvttiMUFVpGlr/dvOCrLEYRcQFx\n6gYDM3PZAgMBAAECggEAMoYJW5G3bv6pnLdJylkijZBwvlaJR+4bLrkOLOo26AQX\nPtGfskEY83NYl2xZBdI4hueCdp3mvqCAjwqY2o2jBXFuKoaGoPyz2xwMaeknhD+y\nusoVVOyqFzLAolbydtB1BVfKsWcSTs+qEaxFFpMM62LfUlB+6KxIN4p504KqYxB2\njHJ18RHftqrG0QrueK6Ar+uxPGhNNhEmVLpHpteLisCBGSZarlbzKwqkNbggYLcH\nHkhRDwJ2JUUBal+v1oe5s5vsU1NTowKQKe3NT1YCFlOpH09H5qCcafiNtoApOMux\noncIhYNwYq/GVAw1uSTdhT/WaLuIuDUzULNsSaAuUQKBgQDSEBr3z8z8tDrljIG/\nWjqh+R4xLWCsVOLqbO1PfODxytLfmJz6mKVtZCbs4/O7scUrcE2fefxTIIPoah7h\nhHlhEGxXCOZksVlSf/KnsMOvXLpJjJpGPH4EjyUcsWGeH9UMOoiL/1iijJfGrnHL\nwvxli+NzyXf5ZH+d18Kn9ndVCwKBgQDD7KEbw+vCimHWdYO/k3n/FV2hWcTCFrgJ\nbgZ1gQ3lz/9v2k29hzmbpttNtajgHvWRTk+0PWN1zMKcer8zdTOHdtTMraSxfaXx\nGdMRKJn/MSn+E9EnrVnLhuZtSXlEnkQ4s/O1rny34uGxHo9MntECily8X9DR39So\nY4dpOS1hKwKBgAFtJJG8MnsgyimW26at+SnyZBcXZMmmxeerl6zrfyeFJgtooOA+\nuxjUDkObhKMooNsbpxtHG8SAuwSP++eyG5TiJKouoEncvmuF/OLQm3OMYKNxNfb2\nIDDtu+XG+o+1TaAIoba5pCNuavVpZ9JnX4lc+s1ld9AUs50hwuubC9JjAoGAVwl2\nANmmkIPdNuJ5ps+jMJiTQayZZgeltjq0j9rHC8K9HTmDs6CxDN6xKfJ7lSTrvqNl\ncRKcbqaKBe3Zpsh4HcPCgTLaqSbCYzsvsr2wu9dhakfvcIroCyxgjUhIoR0V/YKj\nz6A2M5KM5JxI2Kbs/w3saJrAL5wZ4rxkWXBXIoUCgYEApW4aluUWDGGDdVN9qH9w\nVV7fVrxi9n5h+MbwvijHziTHIYh+uaJWA8zo3T+T+iF5KgrkYkmRdQIKx6fxzkF9\ngQsUUUFtslsDLIZpEeXKsMCwGJlIVlbYCtyjwMt//Vz/TBwlHd1Df/6dkuyjKzwx\nyz+YwPxFkqlj3JqSwTH68DY=\n-----END PRIVATE KEY-----\n",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});
async function getList(sheet, spreadsheetId) {
    await jwtClient.authorize();
    let config = {
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: sheet + "!A:D"
    };
    let result = await sheets.spreadsheets.values.get(config, {});
    let rows = result.data.values;
    let results = [];
    rows.forEach((values, index) => {
        if (index > 0) {
            let model = {
                "company_name": values[1],
                "image_url": values[2],
                "url": values[3]
            };
            results.push(model);
        }
    });
    return results;
}
exports.topcompanies = functions.region('asia-southeast2').https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    if (request.method === 'OPTIONS') {
        response.set('Access-Control-Allow-Methods', 'GET');
        response.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin');
        response.set('Access-Control-Max-Age', '3600');
        return response.status(204).send('');
    }
    else {
        let result = await getList('10 companies', "1Omj--nmsJ4wP3IpqC-Xlxbaf01csaXPkH7cMMVvSX_E");
        return response.send(result);
    }
});
//# sourceMappingURL=index.js.map