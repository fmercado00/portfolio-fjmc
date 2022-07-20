
$(document).ready(function () {

    $("#btnAnalyze").click(function () {
        var AnalyzeTextRequestModel = new Object();
        var selectedOption = $("#AnalyzeOption").val();
        var endpointUrl = "";
        if ($.fn.dataTable.isDataTable('#JsonData')) {
            var table = $('#JsonData').DataTable();
            table.destroy();
        }
        switch (selectedOption) {
            case "0":
                return;
                break;
        
                case "1":
                    endpointUrl =  "https://localhost:7013/api/DetectLanguage"; // "https://franciscomercado.eco2.mx/api/api/DetectLanguage";
                    break;
            default:
                break;
        }
        var textToBeAnalyzed = $('#TextToAnalyze').val();
        AnalyzeTextRequestModel.TextToAnalyze = textToBeAnalyzed;
        $.ajax({
            type: "POST",
            url: endpointUrl,
            data: JSON.stringify(AnalyzeTextRequestModel),
            contentType: "application/json",
            accept:"*/*",
            dataType: "json",
            success:
                 function (results) {
                    var datos = new Array();
                    var iRow = 0;
                    datos[iRow] = new Array(2);
                    datos[iRow][0] = "Language";
                    datos[iRow][1] = results.detectedLanguage;
                    iRow++;
                    datos[iRow] = new Array(2);
                    datos[iRow][0] = "Confidence";
                    datos[iRow][1] = results.confidenceScore;
                    iRow++;
                    datos[iRow] = new Array(2);
                    datos[iRow][0] = "Iso6391Name";
                    datos[iRow][1] = results.iso6391Name;
                    iRow++;
                    datos[iRow] = new Array(2);
                    datos[iRow][0] = "Error";
                    datos[iRow][1] = results.error;
                    iRow++;
                    $("#gw").removeClass("d-none");
                    $('#JsonData').DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        data: datos
                    });
                 },
            error:
            function (XmlHttpError, error, description) {
                alert(XmlHttpError.responseText);
            },
            async: true
        });
    });
    


});