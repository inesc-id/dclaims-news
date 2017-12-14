# Claim Modal

## JSON Schema
```json
{
    "id": "claim_id",
    "type": ["hypercerts_claim"],
    "issuer": "issuer_id",
    "issued": "yyyy-mm-dd",
    "claim": {
      "id": "article_id",
      "description":"kk",
    },
    "revocation": {
      "id": "http://example.gov/revocations/738",
      "type": "SimpleRevocationList2017"
    },
    "signature": {
      "type": "LinkedDataSignature2015",
      "created": "2016-06-18T21:19:10Z",
      "creator": "https://example.com/jdoe/keys/1",
      "domain": "json-ld.org",
      "nonce": "598c63d6",
      "signatureValue": "BavEll0/I1zpYw8XNi1bgVg/sCneO4Jugez8RwDg/+
      MCRVpjOboDoe4SxxKjkCOvKiCHGDvc4krqi6Z1n0UfqzxGfmatCuFibcC1wps
      PRdW+gGsutPTLzvueMWmFhwYmfIFpbBu95t501+rSLHIEuujM/+PXr9Cky6Ed
      +W3JT24="
    }
  }
```
