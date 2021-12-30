
const path   = require('path');
const apidoc = require('apidoc');
const {exec} = require('child_process');
const fs     = require('fs/promises')

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

describe('Test apidoc swagger', () => {

    const src = path.resolve(__dirname, 'input')
    const dest = path.resolve(__dirname, 'output')

    beforeEach(async () => {
        //await fs.readdir(dest).then((f) => Promise.all(f.map(e => fs.unlink(path.join(dest, e)))))
        await fs.rmdir(dest, {recursive: true});
        await fs.mkdir(dest);
    });


    it('simple file should be transformed correctly', async () => {

        const script = `apidoc --simulate -i ${src} -o ${dest}`
        await exec(script);
        await delay(1); //since swagger file is written in process.exit, it may not be done when we want to load it.
        const swaggerFs = await fs.readFile(path.join(dest, 'swagger.json'));
        const swaggerJson = JSON.parse(swaggerFs);
        expect(swaggerJson).toHaveProperty('info.description', 'apidocjs plugin to export swagger openapi specification');
        expect(swaggerJson).toHaveProperty('paths./company/{company}/user/{user}/favorites');
        const parameters = swaggerJson.paths["/company/{company}/user/{user}/favorites"].get.parameters;
        expect(swaggerJson).toEqual(
        {
            "info": {
              "title": "My API",
              "version": "1.0.0",
              "description": "apidocjs plugin to export swagger openapi specification"
            },
            "basePath": "/",
            "swagger": "2.0",
            "paths": {
              "/company/{company}/user/{user}/favorites": {
                "get": {
                  "summary": "Request User information",
                  "tags": [
                    "User"
                  ],
                  "description": "This is a really long description that\n spans multiple lines. and inclues some random things",
                  "parameters": [
                    {
                      "name": "company",
                      "in": "path",
                      "required": true,
                      "description": "CompanyId of the User",
                      "type": "number"
                    },
                    {
                      "name": "user",
                      "in": "path",
                      "required": true,
                      "description": "Users unique ID.",
                      "type": "number"
                    },
                    {
                      "name": "optional",
                      "in": "query",
                      "required": true,
                      "description": "Optional query parameter",
                      "type": "number"
                    },
                    {
                      "name": "isArchived",
                      "in": "query",
                      "required": true,
                      "description": "unique ID.",
                      "type": "boolean"
                    }
                  ]
                }
              }
            },
            "definitions": {}
        });
    });
});


