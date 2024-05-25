---
title: Roles and metadata
---

TUF uses roles to define the set of actions a party can perform. The concept of
roles allows TUF to only trust information provided by the correctly
designated party. The root role indicates which roles can sign for which projects.

The roles sign metadata, which TUF uses to create verifiable records about the state
of a repository or application at a specified time. As such, clients can use
it to make decisions on which files to update. Different metadata files provide
different information, and will be signed by different roles.

The signed metadata files always include an expiration date. This ensures
that outdated metadata will be detected and that
clients can refuse to accept metadata older than that which they've already seen.

Implementers of TUF may use any data format for metadata files. The examples
here use a subset of the JSON object format. When calculating the
digest of an object, we use the [Canonical JSON](http://wiki.laptop.org/go/Canonical_JSON) format. Implementation-level detail about the metadata can be found in the [spec](https://github.com/theupdateframework/specification/blob/master/tuf-spec.md).

There are four required top-level roles, each with their own metadata file.

Required:

* Root
* Targets
* Snapshot
* Timestamp

Optional:

There may also be any number of delegated target roles.

## Root Metadata (root.json)

Signed by: Root role.

Specifies the other top-level roles. When specifying these roles, the trusted
keys for each are listed, along with the minimum number of those keys required
to sign the role's metadata. We call this number the signature threshold.

See an **example**

```
{
 "signatures": [
  {
   "keyid": "4e777de0d275f9d28588dd9a1606cc748e548f9e22b6795b7cb3f63f98035fcb",
   "sig": 
   "a337d6375fedd2eabfcd6c2ef6c8a9c3bb85dc5a857715f6a6bd41123e7670c4972d8548bcd
   7248154f3d864bf25f1823af59d74c459f41ea09a02db057ca1245612ebbdb97e782c501dc3e
   094f7fa8aa1402b03c6ed0635f565e2a26f9f543a89237e15a2faf0c267e2b34c3c38f2a43a2
   8ddcdaf8308a12ead8c6dc47d1b762de313e9ddda8cc5bc25aea1b69d0e5b9199ca02f5dda48
   c3bff615fd12a7136d00634b9abc6e75c3256106c4d6f12e6c43f6195071355b2857bbe377ce
   028619b58837696b805040ce144b393d50a472531f430fadfb68d3081b6a8b5e49337e328c9a
   0a3f11e80b0bc8eb2dc6e78d1451dd857e6e6e6363c3fd14c590aa95e083c9bfc77724d78af8
   6eb7a7ef635eeddaa353030c79f66b3ba9ea11fab456cfe896a826fdfb50a43cd444f762821a
   ada9bcd7b022c0ee85b8768f960343d5a1d3d76374cc0ac9e12a500de0bf5d48569e5398cada
   dadab045931c398e3bcb6cec88af2437ba91959f956079cbed159fed3938016e6c3b5e446131
   f81cc5981"
  }
 ],
 "signed": {
  "_type": "root",
  "consistent_snapshot": false,
  "expires": "2030-01-01T00:00:00Z",
  "keys": {
   "4e777de0d275f9d28588dd9a1606cc748e548f9e22b6795b7cb3f63f98035fcb": {
    "keyid_hash_algorithms": [
     "sha256",
     "sha512"
    ],
    "keytype": "rsa",
    "keyval": {
    "public": "-----BEGIN PUBLIC KEY-----
    \nMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA0GjPoVrjS9eCqzoQ8VRe
    PkC0cI6ktiEgqPfHESFzyxyjC490Cuy19nuxPcJuZfN64MC48oOkR+W2mq4pM51i
    xmdG5xjvNOBRkJ5wUCc8fDCltMUTBlqt9y5eLsf/4/EoBU+zC4SW1iPU++mCsity
    fQQ7U6LOn3EYCyrkH51hZ/dvKC4o9TPYMVxNecJ3CL1q02Q145JlyjBTuM3Xdqsa
    ndTHoXSRPmmzgB/1dL/c4QjMnCowrKW06mFLq9RAYGIaJWfM/0CbrOJpVDkATmEc
    MdpGJYDfW/sRQvRdlHNPo24ZW7vkQUCqdRxvnTWkK5U81y7RtjLt1yskbWXBIbOV
    z94GXsgyzANyCT9qRjHXDDz2mkLq+9I2iKtEqaEePcWRu3H6RLahpM/TxFzw684Y
    R47weXdDecPNxWyiWiyMGStRFP4Cg9trcwAGnEm1w8R2ggmWphznCd5dXGhPNjfA
    a82yNFY8ubnOUVJOf0nXGg3Edw9iY3xyjJb2+nrsk5f3AgMBAAE=\n-----END PUBLIC KEY-----"
    },
    "scheme": "rsassa-pss-sha256"
   },
   "59a4df8af818e9ed7abe0764c0b47b4240952aa0d179b5b78346c470ac30278d": {
    "keyid_hash_algorithms": [
     "sha256",
     "sha512"
    ],
    "keytype": "ed25519",
    "keyval": {
     "public": "edcd0a32a07dce33f7c7873aaffbff36d20ea30787574ead335eefd337e4dacd"
    },
    "scheme": "ed25519"
   },
   "65171251a9aff5a8b3143a813481cb07f6e0de4eb197c767837fe4491b739093": {
    "keyid_hash_algorithms": [
     "sha256",
     "sha512"
    ],
    "keytype": "ed25519",
    "keyval": {
     "public": "89f28bd4ede5ec3786ab923fd154f39588d20881903e69c7b08fb504c6750815"
    },
    "scheme": "ed25519"
   },
   "8a1c4a3ac2d515dec982ba9910c5fd79b91ae57f625b9cff25d06bf0a61c1758": {
    "keyid_hash_algorithms": [
     "sha256",
     "sha512"
    ],
    "keytype": "ed25519",
    "keyval": {
     "public": "82ccf6ac47298ff43bfa0cd639868894e305a99c723ff0515ae2e9856eb5bbf4"
    },
    "scheme": "ed25519"
   }
  },
  "roles": {
   "root": {
    "keyids": [
     "4e777de0d275f9d28588dd9a1606cc748e548f9e22b6795b7cb3f63f98035fcb"
    ],
    "threshold": 1
   },
   "snapshot": {
    "keyids": [
     "59a4df8af818e9ed7abe0764c0b47b4240952aa0d179b5b78346c470ac30278d"
    ],
    "threshold": 1
   },
   "targets": {
    "keyids": [
     "65171251a9aff5a8b3143a813481cb07f6e0de4eb197c767837fe4491b739093"
    ],
    "threshold": 1
   },
   "timestamp": {
    "keyids": [
     "8a1c4a3ac2d515dec982ba9910c5fd79b91ae57f625b9cff25d06bf0a61c1758"
    ],
    "threshold": 1
   }
  },
  "spec_version": "1.0.0",
  "version": 1
 }
}
``` 

## Targets Metadata (targets.json)

Signed by: Targets role.

Target files are the actual files that clients want to download, such as
the software updates they are trying to obtain. The targets.json metadata
file lists hashes and sizes of target files.

This file can optionally define other roles to which it delegates trust,
or specify that another role is to be trusted for some or all of the target files
available from the repository. When delegated roles are specified, it is done
so in a way similar to how the Root role specifies the top-level roles: by giving
the trusted keys and signature threshold for each role. Additionally, one or more
[glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)) will be specified to indicate the target file paths for which clients should trust each delegated role.

See as an **example**
```
{
 "signatures": [
  {
   "keyid": "65171251a9aff5a8b3143a813481cb07f6e0de4eb197c767837fe4491b739093",
   "sig": 
   "d65f8db0c1a8f0976552b9742bbb393f24a5fa5eaf145c37aee047236c79dd0b83
   cfbb8b49fa7803689dfe0031dcf22c4d006b593acac07d69093b9b81722c08"
  }
 ],
 "signed": {
  "_type": "targets",
  "delegations": {
   "keys": {
    "c8022fa1e9b9cb239a6b362bbdffa9649e61ad2cb699d2e4bc4fdf7930a0e64a": {
     "keyid_hash_algorithms": [
      "sha256",
      "sha512"
     ],
     "keytype": "ed25519",
     "keyval": {
      "public": "fcf224e55fa226056adf113ef1eb3d55e308b75b321c8c8316999d8c4fd9e0d9"
     },
     "scheme": "ed25519"
    }
   },
   "roles": [
    {
     "keyids": [
      "c8022fa1e9b9cb239a6b362bbdffa9649e61ad2cb699d2e4bc4fdf7930a0e64a"
     ],
     "name": "role1",
     "paths": [
      "file3.txt"
     ],
     "terminating": false,
     "threshold": 1
    }
   ]
  },
  "expires": "2030-01-01T00:00:00Z",
  "spec_version": "1.0.0",
  "targets": {
   "file1.txt": {
    "custom": {
     "file_permissions": "0644"
    },
    "hashes": {
     "sha256": "65b8c67f51c993d898250f40aa57a317d854900b3a04895464313e48785440da",
     "sha512": 
     "467430a68afae8e9f9c0771ea5d78bf0b3a0d79a2d3d3b40c69fde4dd42c4614
     48aef76fcef4f5284931a1ffd0ac096d138ba3a0d6ca83fa8d7285a47a296f77"
    },
    "length": 31
   },
   "file2.txt": {
    "hashes": {
     "sha256": "452ce8308500d83ef44248d8e6062359211992fd837ea9e370e561efb1a4ca99",
     "sha512": 
     "052b49a21e03606b28942db69aa597530fe52d47ee3d748ba65afcd14b857738
     e36bc1714c4f4adde46c3e683548552fe5c96722e0e0da3acd9050c2524902d8"
    },
    "length": 39
   }
  },
  "version": 1
 }
}
```

## Delegated Targets Metadata (role1.json)

Signed by: A delegated targets role.

A metadata file provided by a Delegated Targets role will follow exactly the same
format as one provided by the top-level Targets role.

When the Targets role delegates trust to other roles, each delegated role will
provide one signed metadata file.  As is the
case with the directory structure of top-level metadata, the delegated files are
relative to the base URL of metadata available from a given repository mirror.

A delegated role file is located at:

/DELEGATED_ROLE.json

where DELEGATED_ROLE is the name of the role specified in targets.json.  If this
role further delegates trust to a role named ANOTHER_ROLE, that role's signed
metadata file would be found at:

/ANOTHER_ROLE.json

See **example** of delegated Targets metadata 
```
{
 "signatures": [
  {
   "keyid": "c8022fa1e9b9cb239a6b362bbdffa9649e61ad2cb699d2e4bc4fdf7930a0e64a",
   "sig": 
   "9408b46569e622a46f1d35d9fa3c10e17a9285631ced4f2c9c2bba2c2842413
   fcb796db4e81d6f988fc056c21c407fdc3c10441592cf1e837e088f2e2dfd5403"
  }
 ],
 "signed": {
  "_type": "targets",
  "delegations": {
   "keys": {
    "c8022fa1e9b9cb239a6b362bbdffa9649e61ad2cb699d2e4bc4fdf7930a0e64a": {
     "keyid_hash_algorithms": [
      "sha256",
      "sha512"
     ],
     "keytype": "ed25519",
     "keyval": {
      "public": 
      "fcf224e55fa226056adf113ef1eb3d55e308b75b321c8c8316999d8c4fd9e0d9"
     },
     "scheme": "ed25519"
    }
   },
   "roles": [
    {
     "keyids": [
      "c8022fa1e9b9cb239a6b362bbdffa9649e61ad2cb699d2e4bc4fdf7930a0e64a"
     ],
     "name": "role2",
     "paths": [],
     "terminating": false,
     "threshold": 1
    }
   ]
  },
  "expires": "2030-01-01T00:00:00Z",
  "spec_version": "1.0.0",
  "targets": {
   "file3.txt": {
    "hashes": {
     "sha256": 
     "141f740f53781d1ca54b8a50af22cbf74e44c21a998fa2a8a05aaac2c002886b",
     "sha512": 
     "ef5beafa16041bcdd2937140afebd485296cd54f7348ecd5a4d035c09759608
     de467a7ac0eb58753d0242df873c305e8bffad2454aa48f44480f15efae1cacd0"
    },
    "length": 28
   }
  },
  "version": 1
 }
}
```

and **example** of a nested delegation
```
{
 "signatures": [
  {
   "keyid": "c8022fa1e9b9cb239a6b362bbdffa9649e61ad2cb699d2e4bc4fdf7930a0e64a",
   "sig": 
   "75b196a224fd200e46e738b1216b3316c5384f61083872f8d14b8b0a378b2344e64b1a6f1
   a89a711206a66a0b199d65ac0e30fe15ddbc4de89fa8ff645f99403"
  }
 ],
 "signed": {
  "_type": "targets",
  "expires": "2030-01-01T00:00:00Z",
  "spec_version": "1.0.0",
  "targets": {},
  "version": 1
 }
}
```

## Snapshot Metadata (snapshot.json)

Signed by: Snapshot role.

The snapshot.json metadata file lists version numbers of all metadata files
other than timestamp.json. This file ensures that clients will see a consistent
view of all files on the repository. That is, metadata files (and thus Target
files) that existed on the repository at different times cannot be combined
and presented to clients by an attacker.

​See **example** of Snapshot metadata.
```
{
 "signatures": [
  {
   "keyid": "59a4df8af818e9ed7abe0764c0b47b4240952aa0d179b5b78346c470ac30278d",
   "sig": 
   "085672c70dffe26610e58542ee552843633cfed973abdad94c56138dbf0cd991644f2d3f27
   e4dda3098e08ab676e7f52627b587947ae69db1012d59a6da18e0c"
  }
 ],
 "signed": {
  "_type": "snapshot",
  "expires": "2030-01-01T00:00:00Z",
  "meta": {
   "role1.json": {
    "version": 1
   },
   "role2.json": {
    "version": 1
   },
   "targets.json": {
    "version": 1
   }
  },
  "spec_version": "1.0.0",
  "version": 1
 }
}
```

## Timestamp Metadata (timestamp.json)

Signed by: Timestamp role.

The timestamp.json metadata file lists the hashes and size of the snapshot.json file.
This is the first and potentially only file that needs to be downloaded when
clients search for updates. It is frequently re-signed, and
has a short expiration date, thus allowing clients to quickly detect if they are
being prevented from obtaining the most recent metadata. An online key is
generally used to automatically re-sign this file at regular intervals.

There are a few reasons why the timestamp.json and snapshot.json files are not
combined:

* The timestamp.json file is downloaded very frequently and so should be kept as
small as possible, especially considering that the snapshot.json file grows
proportionally with the number of delegated target roles.
* As the Timestamp role's key is an online key and thus at high risk, separate
keys should be used for signing the snapshot.json file so that the
Snapshot role's keys can be kept offline, and thus more secure.
* Timestamp.json may be given to mirrors.

See **example** of Timestamp metadata.
```
{
 "signatures": [
  {
   "keyid": "8a1c4a3ac2d515dec982ba9910c5fd79b91ae57f625b9cff25d06bf0a61c1758",
   "sig": 
   "de0e16920f87bf5500cc65736488ac17e09788cce808f6a4e85eb9e4e478a312b4c1a2d7723
   af56f7bfb1df533c67d8c93b6f49d39eabe7fae391a08e1f72f01"
  }
 ],
 "signed": {
  "_type": "timestamp",
  "expires": "2030-01-01T00:00:00Z",
  "meta": {
   "snapshot.json": {
    "hashes": {
     "sha256": "8f88e2ba48b412c3843e9bb26e1b6f8fc9e98aceb0fbaa97ba37b4c98717d7ab"
    },
    "length": 515,
    "version": 1
   }
  },
  "spec_version": "1.0.0",
  "version": 1
 }
}
```