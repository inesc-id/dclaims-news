# Hypercerts Claims Schema

**Fields**

- `id`: UID:claim
- `type`: Type of hypercerts claim. Currently only `hypercerts_news_claimed` being used.
- `issuer`: Issuer ID. Not yet defined the type of ID.
- `issued`: Issuance date.

**Claim**
- `id`: News article ID (currently a hash of the news title)
- `type`: Currently using some of [BS Detector](https://github.com/bs-detector/bs-detector) classifications:
    -   **Fake News:** Sources that fabricate stories out of whole cloth with the intent of pranking the public.
    -   **Satire:** Sources that provide humorous commentary on current events in the form of fake news.
    -   **Extreme Bias:** Sources that traffic in political propaganda and gross distortions of fact.
    -   **Conspiracy Theory:** Sources that are well-known promoters of kooky conspiracy theories.
    -   **State News:** Sources in repressive states operating under government sanction.
    -   **Junk Science:** Sources that promote pseudoscience, metaphysics, naturalistic fallacies, and other scientifically dubious claims.
    -   **Clickbait:** Sources that are aimed at generating online advertising revenue and rely on sensationalist headlines or eye-catching pictures.

**Revocation**
- Not defined yet.

**Signature**
- Not defined yet.

## JSON Schema
```json
{
    "id": "claim_id",
    "type": ["hypercerts_news_claim"],
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

