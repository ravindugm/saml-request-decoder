const http = require('http');
const saml = require('saml-encoder-decoder-js');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('#####################SAML Request#####################\n\n');

    let path = req.url;
    let queryParameter = path.split('/')[1];
    console.log('\n\nQuery Parameter: ' + queryParameter);
  
    // Extract the SAML request parameter
    let samlReq = queryParameter.split('=')[1];
    res.write('SAML Request: ' + samlReq);
    console.log('\n\nSAML Request: ' + samlReq);
    
    // Identify the SAML request is encoded or not
    function isEncoded(samlReq) {
        samlReq = samlReq || '';
      
        return samlReq !== decodeURIComponent(samlReq);
      }

    // Print SAML request as XML  
    if (isEncoded(samlReq)) {
        console.log('\n\nThis is encoded SAML request.');
        saml.decodeSamlRedirect(samlReq, function(err, xml) {
            if (!err) {
              console.log('\n\nDecoded XML: ', xml);
            }
          });
        
    } else {
        console.log('\n\nThis is not encoded SAML request');
    }  
    
    res.end('\n\n#####################End Task#####################');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});