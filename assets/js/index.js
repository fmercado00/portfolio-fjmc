
$(document).ready(function () {

    $("#btnAnalyze").click(function () {
        $("#gw").addClass("d-none");
        $("#LinkedEntities").addClass("d-none");
        $("#GlobalScore").addClass("d-none");
        $("#DetailScore").addClass("d-none");
        
        var AnalyzeTextRequestModel = new Object();
        var selectedOption = $("#AnalyzeOption").val();
        var endpointUrl = "";
        var textToBeAnalyzed = $('#TextToAnalyze').val();
        AnalyzeTextRequestModel.TextToAnalyze = textToBeAnalyzed;
        if ($.fn.dataTable.isDataTable('#JsonDataDetectLanguage')) {
            var table = $('#JsonDataDetectLanguage').DataTable();
            table.destroy();
        }
        if ($.fn.dataTable.isDataTable('#JsonLinkedEntities')) {
            var table = $('#JsonLinkedEntities').DataTable();
            table.destroy();
        }
        if ($.fn.dataTable.isDataTable('#JsonGlobalScore')) {
            var table = $('#JsonGlobalScore').DataTable();
            table.destroy();
        }
        if ($.fn.dataTable.isDataTable('#JsonDetailScore')) {
            var table = $('#JsonDetailScore').DataTable();
            table.destroy();
        }
        
        switch (selectedOption) {
            case "0":
                return;
                break;
        
                case "1":
                    endpointUrl =  "https://localhost:7013/api/DetectLanguage"; // "https://franciscomercado.eco2.mx/api/api/DetectLanguage";
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
                                $('#JsonDataDetectLanguage').DataTable({
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
                    break;
                    case "2":
                    endpointUrl =  "https://localhost:7013/api/GetPhrases"; // "https://franciscomercado.eco2.mx/api/api/GetPhrases";
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
                                $.each(results.phrases, function () {
                                    datos[iRow] = new Array(2);
                                    datos[iRow][0] = "Phrase:";
                                    datos[iRow][1] = results.phrases[iRow];
                                    iRow++;
                                });
                                $("#gw").removeClass("d-none");
                                $('#JsonDataDetectLanguage').DataTable({
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
                    break;
                    case "3":
                    endpointUrl =  "https://localhost:7013/api/GetRecognizedEntities"; // "https://franciscomercado.eco2.mx/api/api/GetRecognizedEntities";
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
                                $.each(results.recognizedEntities, function () {
                                    datos[iRow] = new Array(2);
                                    datos[iRow][0] = results.recognizedEntities[iRow].text;
                                    datos[iRow][1] = results.recognizedEntities[iRow].category;
                                    iRow++;
                                });
                                $("#gw").removeClass("d-none");
                                $('#JsonDataDetectLanguage').DataTable({
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
                    break;
                    case "4":
                    endpointUrl =  "https://localhost:7013/api/GetRecognizedLinkedEntities"; // "https://franciscomercado.eco2.mx/api/api/GetRecognizedLinkedEntities";
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
                                $.each(results.recognizedLinkedEntities, function () {
                                    datos[iRow] = new Array(4);
                                    datos[iRow][0] = results.recognizedLinkedEntities[iRow].name;
                                    datos[iRow][1] = results.recognizedLinkedEntities[iRow].dataSource;
                                    datos[iRow][2] = results.recognizedLinkedEntities[iRow].language;
                                    datos[iRow][3] = results.recognizedLinkedEntities[iRow].url;
                                    iRow++;
                                });
                                $("#LinkedEntities").removeClass("d-none");
                                $('#JsonLinkedEntities').DataTable({
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
                    break;
                    case "5":
                    endpointUrl =  "https://localhost:7013/api/GetSentiment"; // "https://franciscomercado.eco2.mx/api/api/GetSentiment";
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
                                datos[iRow] = new Array(3);
                                datos[iRow][0] = results.confidenceScores.positive;
                                datos[iRow][1] = results.confidenceScores.neutral;
                                datos[iRow][2] = results.confidenceScores.negative;
                                var datos2 = new Array();
                                var iRow2 = 0;
                                $.each(results.sentences, function () {
                                    datos2[iRow2] = new Array(4);
                                    datos2[iRow2][0] = results.sentences[iRow2].text;
                                    datos2[iRow2][1] = results.sentences[iRow2].confidenceScores.positive;
                                    datos2[iRow2][2] = results.sentences[iRow2].confidenceScores.neutral;
                                    datos2[iRow2][3] = results.sentences[iRow2].confidenceScores.negative;
                                    iRow2++;
                                });
                                $("#GlobalScore").removeClass("d-none");
                                $('#JsonGlobalScore').DataTable({
                                    "paging": false,
                                    "searching": false,
                                    "ordering": true,
                                    "info": false,
                                    data: datos
                                });
                                $("#DetailScore").removeClass("d-none");
                                $('#JsonDetailScore').DataTable({
                                    "paging": false,
                                    "searching": false,
                                    "ordering": true,
                                    "info": false,
                                    data: datos2
                                });
                             },
                        error:
                        function (XmlHttpError, error, description) {
                            alert(XmlHttpError.responseText);
                        },
                        async: true
                    });
                    break;
            default:
                break;
        }
    });
 });