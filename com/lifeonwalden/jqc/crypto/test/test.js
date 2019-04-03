$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponents(['charUtil', 'crypto']));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['crypto']).execute(function () {
            QUnit.test("key", function (assert) {
                let done = assert.async(2);
                $.crypto.aesGenerateKeyAsync()
                    .then(key => {
                        assert.equal(1, 1, key);
                        done();

                        $.crypto.importKeyAsync(key)
                            .then(importedKey => {
                                crypto.subtle.exportKey('raw', importedKey).then(exportedKey => {
                                    assert.equal($.charUtil.byteToU64(exportedKey), key, $.charUtil.byteToU64(exportedKey));
                                    done();
                                });
                            });
                    });
            });
            QUnit.test("AES", function (assert) {
                let text = "AES-GCM加解密测试";
                let done = assert.async(2);
                $.crypto.aesGenerateKeyAsync()
                    .then(key => {
                        $.crypto.importKeyAsync(key)
                            .then(importedKey => {
                                $.crypto.encryptAesGcmAsync(importedKey, text)
                                    .then(result => {
                                        assert.equal(1, 1, result.text);
                                        done();

                                        $.crypto.decryptAesGcmAsync(importedKey, result.text, result.iv)
                                            .then(decryptedText => {
                                                assert.equal(decryptedText, text, decryptedText);
                                                done();
                                            })
                                            .catch(err => {
                                                assert.equal(1, 0, err);
                                                console.error(err);
                                                done();
                                            });
                                    });
                            });
                    });
            });
            QUnit.test("RSA", function (assert) {
                let text = "RSA-OAEP加解密测试RSA-OAEP加RSA-OAEP加解密测试RSA-OAEP加解密测试RSA-OAEP加解密测试解密测试RSA-OAEP加解密测试RSA-OAEP加解密测试RSA-OAEP加解密测试";
                let done = assert.async(2);
                $.crypto.rsaGenerateKeyAsync()
                    .then(key => {
                        $.crypto.importKeyAsync(key.publicKey, 'spki', {
                                name: 'RSA-OAEP',
                                hash: "SHA-256",
                            }, ['encrypt'])
                            .then(importedPublicKey => {
                                $.crypto.encryptRsaAsync(importedPublicKey, text)
                                    .then(encryptedText => {
                                        assert.equal(1, 1, encryptedText);
                                        done();

                                        $.crypto.importKeyAsync(key.privateKey, 'pkcs8', {
                                                name: 'RSA-OAEP',
                                                modulusLength: 2048,
                                                publicExponent: new Uint8Array([1, 0, 1]),
                                                hash: "SHA-256",
                                            }, ['decrypt'])
                                            .then(importedPrivate => {
                                                $.crypto.decryptRsaAsync(importedPrivate, encryptedText)
                                                    .then(decryptedText => {
                                                        assert.equal(decryptedText, text, decryptedText);
                                                        done();
                                                    })
                                                    .catch(err => {
                                                        assert.equal(1, 0, err);
                                                        done();
                                                    });
                                            })
                                            .catch(err => console.error(err));

                                    })
                                    .catch(err => console.error(err));
                            })
                            .catch(err => console.error(err));
                    })
                    .catch(err => console.error(err));
            });
            QUnit.test("RSA decrypt with server using client key", function (assert) {
                let done = assert.async();
                let text = "加解密字符串hello world!逆向工程";
                let privateKey = "=8Sggw=wAQAC=qkgBN=3bISGC=BEQAN=CSAAF=CCjpE=BIgoE=BIo=PMNAB=nxXGrB=xIeaq=V7dgBB=6DBkJC=+htCDD=1g456=pDPqgC=mhukb=41rco=pxtqJD=tJRtsC=+KKkv=jLMuo=zYp14D=BY96YD=KcNHlC=+WL2W=bqyyJ=oWx/t=bsGojC=wUielC=Uhxos=zBgpgC=x7GPxB=/4OJEB=JYhsL=/l8MTD=bbkNHB=9W00b=maPx7C=Se0A5=erNkzD=DkAFhD=LN17XD=O9mCRD=LHUYYC=rBSjnD=C7tl3=qZBrTB=kyc19=YH1TND=Bwyc5B=DseOo=RtdRPD=PW4v4=E0v2ZD=jwy5y=PzqfHD=1eewwB=eVmkBC=gBlZeC=MufjIB=NP8FgC=xzQYnB=rOqjhC=Y+CveD=nem5HB=TQXoAB=OMZRKD=BQ2GR=lAI/R=Dwg0CD=DdjmuB=DIQb0C=CEAAB=MAQACC=GzIpwC=by0e8D=jaFw8D=ekusT=9yBPYB=Y44EpB=x7FZpB=LpAjYB=n1fWe=fO90zB=+YbMx=qNGzkB=nhlOMD=ySPEMC=mJzFvC=l2E5u=d/ySxC=FEZOiC=JagXfB=+9Ww3C=Ca8IZB=UJTEmB=SJRweD=BPYyR=+WQkb=JiyZsB=cMd28=l1koLC=5pFvjB=xyPlFC=tvbd5D=TAwVUD=SbQ/sD=nRxvmC=Xgh+5=nz2EdD=mZCOpC=/QrQeC=ODu2PB=nPWTq=Q/B8+B=uQ0ev=bHPu+=r80L8B=qG2puB=+8fgJ=rhZpnC=5K9At=YlPGsB=365sY=rzciYC=mkzdeB=zk2gHD=HKtOPC=IAooL=mv+MrB=Efv/kD=8K0Nw=uXyKO=Q85pZ=NFmpIB=rQF9wB=RpaqLD=CkCjj=wDQgBC=PdkJxB=lmJpOD=es7HEB=ILSB7=nzBFdC=5zAN0C=sVlss=cCV5wD=Q2pGN=9Flde=kQdkXD=R/E3xD=5yLbAC=EHmssD=WVKozB=9OCNY=NV0c0D=i2CZCC=RsL97=T8xZ7C=ZcmIWB=l/GVoB=1wRJjD=ElIsg=IjyjwC=46YPl=tcH6YD=VHh/jD=Ban94=YkAL8C=9XsDMD=CUdk2C=gDQgBC=6FZk3C=WHmRBB=Hiu+=mOC9WC=iW+S+D=eOcfh=GvuSfC=qMgFDD=fnYSN=V1ZQdC=r+i25C=I5dKED=8UdYIB=Yq6HYC=VDHavD=ZusbfB=j4Mwl=HSyZAB=vg5IR=2D/2zD=Pw+Bm=61cfS=6ePDFB=iMm0vC=BsmF4C=1ZU8lC=/CrYo=DcagSC=6jA7jB=dg3w6D=EOeffD=CkDTK=vGBgBC=MveJxD=/6btC=mGgKNC=6wW0LB=2pT4JC=u4fI6=wo+i4B=sycXqC=hMUG2D=eIGiKD=cWsf6B=HIPH5D=giFelB=O1k29D=sFgMIB=2CZYUB=UxByrC=sMANMC=5b56v=DU6MXB=/9lEAC=FUwPa=fKKl5=NsK/dD=XUh6lD=FCTOQ=XA/ScD=c9FeGB=btVXK=CYXTRD=DH7zEC=BKQZ9=3Q8PAC=iiah9B=2nwP1=xi9Jp=2VNsc=gDjCqB=W3uMED=24wwPD=63P3fD=oAoMBB=jUjYPB=8bR5xD=tpHhe=9ocmwC=A3sJq=Rw9SgD=5ynmPD=PRbhS=vdLcQD=uwzTXB=A0LWMD=qJ2f=FjOdqD=D6uQ+=ukB+PC=fNJXbD=q/B98=GNyZpC=GgtQBD=p6WoxD=Ac6Gr=gn/HND=AGoAZ=dX4V7=dV+s6C=NGk0yC=qIzx1B=aDMbTD=47ynGB=We5oo=+6xwHD=KJ1adC=mFzenD=IllwO=o589jD=C/gY3B=+YqON=dbvl7C=5HfJkD=eij1yB=QW4J7D=8kfsSD=fEeEhD=LrI7tB=I9eYbB=E208iC=w370DD=gQnjT=5wyAO=Jnk+c=8RmOVD=t8ptoD=y3x5yC=sIYIyC=yU8CM";
                let encryptedText = "=6df9t=8igBI=Aag5BC=KdV9VC=14ryUD=MqHG4C=d+lsVC=LOytaD=OIthO=AcG4wC=ATQoq=/WxNzB=ccLELD=s9gCmC=JzUQIB=AF/y0B=Cwb2F=vOdb8C=83rt1=47axyB=gySx6=ib/6yC=IgnYhB=fVioL=zAtz3B=hQm97=pwy1H=DsrknC=TzHZUB=LYdor=1gCx3=3QonQ=N2x89B=qtf/z=+IjFaD=+uGYmC=2dN2qC=vi/CnD=L7ioFC=CIXX/B=+aR5UB=WSqUeD=gE1sDC=RFq1l=I5uqwB=XVvoT=olozYB=LAc+TD=EaBosD=TdTFU=PiNoE=QGfbsB=GJa3G=bQfOV=tSwIK=LQiF2B=kCEwYC=q3/QM=6Lbr+C=W4Vn+C=FiD8hC=inplgD=9PasTC=gJSNHC";

                $.crypto.importKeyAsync(privateKey, 'pkcs8', {
                        name: 'RSA-OAEP',
                        modulusLength: 2048,
                        publicExponent: new Uint8Array([1, 0, 1]),
                        hash: "SHA-256",
                    }, ['decrypt'])
                    .then(importedPrivate => {
                        $.crypto.decryptRsaAsync(importedPrivate, encryptedText)
                            .then(decryptedText => {
                                assert.equal(decryptedText, text, decryptedText);
                                done();
                            })
                            .catch(err => {
                                assert.equal(1, 0, err);
                                done();
                            });
                    })
                    .catch(err => console.error(err));
            });
            QUnit.test("RSA decrypt with server using server key", function (assert) {
                let done = assert.async();
                let text = "加解密字符串hello world!逆向工程";
                let privateKey = "=-306=+Sggw=wAQAC=qkgBN=3bISGC=BEQAN=CSAAF=CCDqE=BIApE=BIo=aGKAB=5ZIQV=u4DYMB=4vVDFC=UXKnMD=O5nozB=E0V61=qSFHrB=CqIcWC=kzSOpC=Yy+hRB=pPhm7B=nrWtY=Ce7wW=RpU4rD=V0af8B=4UN7R=Sb+7aD=hGD3J=eHIzlB=Ay2CWC=cyGvDC=6tY9JC=aMJgbC=Eu5FTB=yvheYD=sfqlgD=94gSbB=10q+nB=lUA5VD=lnS3M=BMOL8C=NRdpOB=D2Ha6D=9tmLKB=CjbGCB=22XBnD=E/HdlB=0HEAw=DSJnfC=+tOeOD=ENV8p=ovoZ0C=uy7GRC=a9DSyD=O373RC=sLxEEB=SmuQvD=Cts+yD=nOUxGD=+3juAC=LekmJ=F31uV=xuKf9D=e35cj=0AEyZB=TCTbAB=mTnloB=sNzX2B=9dZ24D=NLqMbB=/x8MqB=vngjO=kWnj2D=DIQTWC=CEAAB=iBQACC=yNoeQB=tH7UM=6GYoCD=43Fil=GxpYpD=zUOUZ=x053IC=fMpQJD=LCLVBB=w/IMm=ZCI6Z=jz1YCC=yqXy3C=ofNfnC=Y4O49=4D/yhC=Q8RibD=b5gUfC=hZMZHB=UqHSwB=wguL9C=5L+nvB=L2tUDD=jIdJh=eszU0D=+TWyLD=M+eZuC=aUNQwD=qnZuR=mssWjC=eFMNVC=Slmyt=ThMF3D=OiZG=B5GIeD=2OEbEC=QONjfD=TFN8JB=jk1nX=cy3Y2=lFKkWD=NlMpfB=4d0FFD=lVUHgB=e6HlK=KFmpH=5UWwEC=wRa0a=KgM/iC=fUUsvD=+ebaWB=jhYyE=gsQOED=szAiuB=oIBf5B=SdaLYD=X769/C=NE2wcC=wH3WqC=SrOQS=CfYthC=OR/bDC=XumCnB=CEwvwB=XDQgBC=ap7/gB=HaDnlD=Q/wEnD=ZPhHaB=qi7bZ=zXx4S=9/NsrD=ks7Gk=VmaEMD=WKdumC=d6eB4D=piJZ+B=cmHzN=JmktkC=Bx5pf=rlyAwC=RsHIIB=6tnw6=2AmHDB=0LEwF=MFVw7B=Fjn92D=AvpA5D=VQ82LD=WsKr2C=Z/AO8D=M+g3uB=w5weL=dGnG2=uAKiVD=XTCtKB=CEsQzD=ADQgBC=Z+lmU=TadE5=ttY3NB=18Q66=pB5JhC=ZNdWn=fMouzD=I41MUB=E6Y3vD=SUyNg=HylM0D=GtDjz=bEa2k=ZJyRWB=+vXzjC=3AeuQB=RsezBD=FXk0QD=G5iJnC=XcXt5B=yAc4WD=FVbDvD=qYagIC=qALMJ=I32IFB=39QcIB=wt3UY=WrhwoB=GORBRD=eiHMjC=GBTQ5C=C0oUH=aCQgBC=xSRVMC=1QAAz=i++/CB=/OHeP=jfAPeC=x79hqC=zS2FYD=OQOHu=GwQjEB=se+yBC=Ja2LDB=HKE8G=dxniUB=eQ/5FC=Ba3Y8B=TSpPAD=vS5/R=jLVXJD=vtDlpB=YzscoC=4CPkID=KIfosD=FT/YF=S8twED=XdWsBD=AasBoC=ZWIy8C=Vj4h1B=oVPTGD=wlKmPB=3PJVuB=CEE7NC=6CQgBC=5EDSOC=TsFO8B=GJLuOD=ENRxwB=JIPNfC=XrscvB=dOR5+C=63mBGB=hPdH4B=FdJ+3B=2R7bFC=rMlFMC=GYtdZC=HPVEbD=ttHVEC=XansRB=DLH4w=aNh8mB=XgfMZ=pCd9yD=JgsxSC=2wLLwC=0tkkAD=51CYgD=3xPlgC=kFJBeB=Y67d2C=ytu56=CGHqgB=SEQ1+B=yx8EI=CEbg3D=EpDgBC=0kSIWC=7Ee1V=ATDiXD=bG0yOB=YfOj1B=puvdf=Q83aaD=SiuB/=flx9iC=ThnSqB=EYAN8D=2KlPU=Yy2CnB=TMZUF=BBYR/C=1bZ/GB=0j6FIC=i6GDM=jb52k=ZV3LJC=y8sGs=4sgxLB=GOLxgC=6AlP2B=oLPwV=1YkEk=4w8IhC=a++r8=HyjdwB=NhBf4B=Kr4oPB=RB=T+///D";
                let encryptedText = "=xfYEW=Hb3YL=Z+x/1=KYGcND=s6cf1C=8SDWCD=RuAHW=NPtJ/B=AkYjGB=5C2mM=OXM2WD=rGZJ2=4p3XbB=rvwgCC=3leJs=k2O6y=2M4hgC=DgDMVC=H2enSD=S05AmC=UAbJ2C=g0eoAC=4ouNDB=3k8NF=rnaHIB=6sh4wB=VBdC3B=fwpoi=zRo3K=918N0B=1NHjlC=4xHpx=LuvqWD=MiPvkB=vQfN9D=5xiZdB=uT3DE=0aaRzC=ngEnB=QyruO=j45PKB=crl/a=/6W72B=Erm2OD=nMLM2C=bEm2PB=kEC7lC=PSvFL=jg6vZC=DF22HC=+XtU3=7nOvH=11b7uD=zmboqC=fR0nSB=siMOvD=wJa/tB=Xo/6M=ArROV=pzEbZC=js9MEB=G5Z7mD=rZ0RbB=SZdxFB";

                $.crypto.importKeyAsync(privateKey, 'pkcs8', {
                        name: 'RSA-OAEP',
                        modulusLength: 2048,
                        publicExponent: new Uint8Array([1, 0, 1]),
                        hash: "SHA-256",
                    }, ['decrypt'])
                    .then(importedPrivate => {
                        $.crypto.decryptRsaAsync(importedPrivate, encryptedText)
                            .then(decryptedText => {
                                assert.equal(decryptedText, text, decryptedText);
                                done();
                            })
                            .catch(err => {
                                assert.equal(1, 0, err);
                                done();
                            });
                    })
                    .catch(err => console.error(err));
            });
            QUnit.test("digest", function (assert) {
                let done = assert.async(5);
                let text = 'SHA256信息摘要测试~a!b@c#d$e%f^c&d*e(f)h`i1j2k3l4m5l6u7v8w9x0y-z=+';
                $.crypto.digestAsync(text)
                    .then(digestAsync1 => {
                        assert.ok(digestAsync1);
                        done();

                        $.crypto.digestAsync(text)
                            .then(digestAsync2 => {
                                assert.ok(digestAsync2, digestAsync1, digestAsync2);
                                done();
                            });

                        $.crypto.digestAsync(text)
                            .then(digestAsync3 => {
                                assert.ok(digestAsync3, digestAsync1, digestAsync3);
                                done();
                            });

                        $.crypto.digestAsync(text)
                            .then(digestAsync4 => {
                                assert.ok(digestAsync4, digestAsync1, digestAsync4);
                                done();
                            });

                        $.crypto.digestAsync(text)
                            .then(digestAsync5 => {
                                assert.ok(digestAsync5, digestAsync1, digestAsync5);
                                done();
                            });
                    });
            });
        });
    });