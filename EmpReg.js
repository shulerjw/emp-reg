var URL, USER, PASS, BIZ;

// requires
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});
var x = require('casper').selectXPath;
var fs = require('fs');
var biznames = require('./biznames.json');

casper.options.viewportSize = { width: 1500, height: 1500 };

casper.userAgent('Mozilla/4.0 (comptible; MSIE 6.0; Windows NT 5.1)');

casper.selectOptionByValue = function(selector, valueToMatch){
    this.evaluate(function(selector, valueToMatch){
        var select = document.querySelector(selector),
            found = false;
        Array.prototype.forEach.call(select.children, function(opt, i){
            if (!found && opt.value.indexOf(valueToMatch) !== -1) {
                select.selectedIndex = i;
                found = true;
            }
        });
        var evt = document.createEvent("UIEvents"); 
        evt.initUIEvent("change", true, true);
        select.dispatchEvent(evt);
    }, selector, valueToMatch);
};

outputFile = './DemoAccounts.csv'
outputFormat = '%USER%,%PASS%,%FEIN%,%BIZ%\r\n'


URL = 'https://devuitax.dew.sc.gov/scuidev/employers-page.html';
// USER = 'SCEmp' + ctr;
PASS = 'P@ssword1234';
// FEIN = '654376697';
// BIZ = biznames.shift();


casper.start();

function randomFEIN() {
    return Math.floor(100000000 + Math.random() * 900000000);
};

    casper.then(function() {
        var current = 8781;
        var endNum = 8783;


        for (;current < endNum;) {

        (function(ctr) {
            casper.thenOpen(URL, function() {
            })

                .then(function() {
                    this.thenClick(x('/html/body/div[2]/div/div/div[2]/div[2]/div[3]/div[3]/a'));
                    this.echo('[ ' + ctr + ' of ' + endNum + ' ] - Creating Employer Account.');
                })

                .then(function() {
                    this.waitForSelector(x('//*[@id="wzsWelcomePage"]'), function() {
                        this.thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'));
                    });
                })

            // enter username + validate
                .waitUntilVisible(x('//*[@id="wzsStepAuth"]'), function() {

                    USER = 'SCEmp' + ctr;

                    this.fillXPath(x('//*[@id="wzsStepAuth"]'), {
                        '//*[@id="txtUserId"]': USER
                        }, false);
                })

                .thenClick(x('//*[@id="btnExecuteRefreshFromObject"]'), function() {
                    })    
              
            // login info cont'd
                .then(function() {
                    this.waitUntilVisible(x('//*[@id="pnlNewPanel8"]'), function() {
                        this.sendKeys('#txtPassword', 'P@ssword1234');
                        this.sendKeys('#txtIstrConfirmPassword', 'P@ssword1234');
                        this.selectOptionByValue('select#ddlFirstSecQue', 'FGTN');
                        this.sendKeys('#txtTextBox10', 'Ms Daniels');
                        this.sendKeys('#txtTextBox11', 'Ms Daniels');
                        this.selectOptionByValue('select#ddlSecondSecQue', 'NHSA'); 
                        this.sendKeys('#txtTextBox13', 'Princess Anne');
                        this.sendKeys('#txtTextBox14', 'Princess Anne');
                        this.selectOptionByValue('select#ddlThirdSecQue', 'BHNM');
                        this.sendKeys('#txtTextBox15', 'Va Beach General');
                        this.sendKeys('#txtTextBox16', 'Va Beach General');
                    });
                })

                .thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    })

                .waitUntilVisible(x('//*[@id="wzsStepLogin"]'), function() {
                    this.thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    });
                })
               
                .waitUntilVisible(x('//*[@id="wzsContactInfo"]'), function() {
                    this.thenClick(x('//*[@id="btnWizardAddNewContact"]'), function() {
                    });
                })

            // contact details
                .waitUntilVisible(x('//*[@id="wzsContactDetail"]'), function() {
                    this.fillXPath(x('//*[@id="wzsContactDetail"]'), {
                        '//*[@id="txtFirstName"]': 'John',
                        '//*[@id="txtLastName"]': 'Smith',
                        '//*[@id="txtCIAddress1"]': '1200 Hampton St',
                        '//*[@id="txtCICity"]': 'Columbia',
                        '//*[@id="txtCIZip"]': '29201',
                        '//*[@id="txtPNumber"]': '8035439879',
                        '//*[@id="txtTextBox18"]': 'john@smith.com',
                        '//*[@id="txtTextBox19"]': 'john@smith.com'
                        }, false);
                    this.selectOptionByValue('select#ddlContactTypeCodeValue', 'PYRL');
                })

                .thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    })

                .waitUntilVisible(x('//*[@id="wzsContactInfo"]'), function() {
                    this.thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    });
                })    

            // liability questions
                .waitUntilVisible(x('//*[@id="wzsInitialQuestion"]'), function() {

                    FEIN = randomFEIN();

                    this.click(x('//*[@id="rblphysical_location_ind_1"]'));
                    this.selectOptionByValue('select#ddlTypeOfEmployment', 'OTHR');
                    this.click(x('//*[@id="rblFutaDec_0"]'));
                    this.click(x('//*[@id="rblPaidRglrWagesInd_1"]'));
                    this.click(x('//*[@id="rblPaidRglrWeeksInd_0"]'));
                    this.fillXPath(x('//*[@id="wzsInitialQuestion"]'), {
                        '//*[@id="txtFerderal_Employee_Id"]': FEIN,
                        '//*[@id="txtSerVBegin"]': '01/01/2015',
                        '//*[@id="txtFirstWageDate"]': '01/08/2015',
                        '//*[@id="txtWorkPerformed"]': '20',
                        '//*[@id="txtPaidRglrWagesDate"]' : '02/08/2015'
                        }, false);
                })
                
                .thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    })

            // business info
                .waitUntilVisible(x('//*[@id="wzsBusinessInformation"]'), function() {

                    BIZ = biznames.shift();

                    this.selectOptionByValue('select#ddlLegalentityType', 'SOLP');
                    this.selectOptionByValue('select#ddlDropDownListOLD', 'MAIL');
                    this.fillXPath(x('//*[@id="wzsBusinessInformation"]'), {
                        '//*[@id="txtlegalName"]': BIZ,
                        '//*[@id="txtTextBox1"]': '01/01/2015'
                        }, false);
                })

                .thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    })    

            // add'l business info
                .waitUntilVisible(x('//*[@id="wzsAdditionalBusinessInformation"]'), function() {
                    this.click(x('//*[@id="rblActLeaseCompany_0"]'));
                    this.click(x('//*[@id="rblChange_fein_ind_0"]'));
                    this.click(x('//*[@id="rblAcquisitionMergerABI_0"]'));
                    this.sendKeys('#txtMultiLocation', '1');
                    this.click(x('//*[@id="chkOptSidesInd"]'));
                }) 

                .thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    })

            // business addresses
                .waitUntilVisible(x('//*[@id="wzsBusinessAddresses"]'), function() {
                    this.selectOptionByValue('select#ddlCasPhysCounty', '2629');
                    this.fillXPath(x('//*[@id="wzsBusinessAddresses"]'), {
                        '//*[@id="txtEAAddress1"]': '1200 Hampton St',
                        '//*[@id="txtTextBox3"]': 'Columbia',
                        '//*[@id="txtEAZipCode"]': '29201',
                        '//*[@id="txtTextBox2"]': '8035439879'
                        }, false);
                    this.click(x('//*[@id="chkCheckBox1"]'));
                    this.click(x('//*[@id="chkSameAsPhys"]'));
                })

                .thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    })

            // NAICS classification
                .waitUntilVisible(x('//*[@id="wzsNAICS"]'), function() {
                    this.selectOptionByValue('select#ddl1StQualification', '56');
                    this.selectOptionByValue('select#ddl2ndQualification', '561');
                    this.selectOptionByValue('select#ddl3rdQualification', '5616');
                    this.selectOptionByValue('select#ddl4thQualification', '56162');
                    this.selectOptionByValue('select#ddl5thQualification', '561621');        
                    this.fillXPath(x('//*[@id="wzsBusinessAddresses"]'), {
                        '//*[@id="txtTextBox6"]': 'NA'
                        }, false);
                })

                .thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    })

                .waitUntilVisible(x('//*[@id="wzsReviewOwner"]'), function() {
                    this.thenClick(x('//*[@id="btnWizardAddNewChildClick"]'), function() {
                    });
                })

            // owner/officer details
                .waitUntilVisible(x('//*[@id="wzsChildOwner"]'), function() {
                    this.selectOptionByValue('select#ddlCasOOCounty', '2629');
                    this.fillXPath(x('//*[@id="wzsChildOwner"]'), {
                        '//*[@id="txtFirstNameIndiv"]': 'John',
                        '//*[@id="txtLastIndiv"]': 'Smith',
                        '//*[@id="txtSSNIndiv1"]': '452351235',
                        '//*[@id="txtFirstPartOwner"]': '01/01/2015',
                        '//*[@id="txtAddressOOILineOne"]': '1200 Hampton St',
                        '//*[@id="txtCityOOI"]': 'Columbia',
                        '//*[@id="txtOOIZip"]': '29201',
                        '//*[@id="txtOwnPNumber"]': '8035439879',
                        }, false);
                })

                .thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    })

                .waitUntilVisible(x('//*[@id="wzsReviewOwner"]'), function() {
                    this.thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    });
                })

            // review & submit
                .waitUntilVisible(x('//*[@id="Summary"]'), function() {
                    this.click(x('//*[@id="chkInfoCertifiedInd"]'));
                }) 

                .thenClick(x('//*[@id="wizMain"]/div[2]/a[2]'), function() {
                    })

               .waitUntilVisible(x('//*[@id="wzsRegistration_Status_Success"]'), function() { 
                    var content = outputFormat.replace('%USER%', USER).replace('%PASS%', PASS).replace('%FEIN%', FEIN).replace('%BIZ%', BIZ);
                    this.capture('Employer'+ ctr +'.png');
                    this.echo('Employer #' + ctr + ' ------------------------Success!');
                    fs.write(outputFile, content, 'a');
                })

        })(current);
        current++;
    }
});

casper.run(function() {
    this.log('Done.')
});