### backgroud

On 27-Dec-2025, Jinghuan received an email from aws with below message

" AWS Certificate Manager (ACM) was unable to renew the certificate automatically using DNS validation. You must take action to ensure that the renewal can be completed before Jan 10, 2026 at 23:59:59 UTC. If the certificate is not renewed and the current certificate expires, your website or application may become unreachable.

To renew this certificate, you must ensure that the proper CNAME records are present in your DNS configuration for each domain listed below. You can find the CNAME records for your domains by expanding your certificate and its domain entries in the ACM console. You can also use the DescribeCertificate command in the ACM API[1] or the describe-certificate operation in the ACM CLI[2] to find a certificate’s CNAME records. For more information, see Automatic Domain Validation Failure in the ACM troubleshooting guide[3].
The following 1 domains require validation:
mood-melody.ensintek.com "

at the same time, in aws acm console, renew status showing "Pending validation",

and a health notification is also seen in aws console warning the same issue.

## procedure to fix the issue

1. Locate the specific certificate with Domain name mood-melody.ensintek.com in aws acm console

2. Find this domain's CNAME name and CNAME value

CNAME name: \_xxxxxxxxxxx.mood-melody.ensintek.com
CNAME value: \_yyyyyyyyyyy.acm-validations.aws

3. Login to https://account.squarespace.com/ (because squarespace is already in use before this project, otherwise Route53 would be used instead) to check whether there is a type CNAME custom record as bellow:

HOST: \_xxxxxxxxxxx.mood-melody
DATA: \_yyyyyyyyyyy.acm-validations.aws

NOTE: HOST is lacking .ensintek.com compared to the CNAME name from aws acm console, because the squarespace add it automatically.

In this case, Jinghuan did not find the record so created it with a TTL of 300 seconds. and click Save.

4. Do a manual DNS look up, this is a crucial diagnostic step to check whether the record in the DNS works.

go to [https://](https://digwebinterface.com/), in the lookup field, enter the full acm CNAME name, i.e \_xxxxxxxxxxx.mood-melody.ensintek.com, click dig to initialize the lookup.

If it works meaning the record is propagated correctly, it should show in the results a CNAME record and its value should be \_yyyyyyyyyyy.acm-validations.aws

5.  Go back to aws acm console to refresh the page, after several refresh the renew status changed to Success from Pending validation.
