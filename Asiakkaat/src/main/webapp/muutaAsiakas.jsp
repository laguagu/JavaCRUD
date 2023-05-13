<%@include file="header.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<script src="scripts/main.js"></script>
<script src="scripts/io.js"></script>
<link rel="stylesheet" href="styles/style.css">
<title>Muuta henkilö</title>
</head>
<body onload="asetaFocus('etunimi')"
	onkeydown="tutkiKey(event, 'paivita')">
	<form name="lomake">
		<table id="listaus">
			<thead>
				<tr>
					<th colspan="5" class="oikealle"><a id="linkki"
						href="listaaAsiakas.jsp">Takaisin listaukseen</a></th>
				</tr>
				<tr>
					<th>Etunimi</th>
					<th>Sukunimi</th>
					<th>Puhelin</th>
					<th>S-posti</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input type="text" name="etunimi" id="etunimi" /></td>
					<td><input type="text" name="sukunimi" id="sukunimi" /></td>
					<td><input type="text" name="puhelin" id="puhelin" /></td>
					<td><input type="text" name="sposti" id="sposti" /></td>
					<td><input type="button" id="hakunappi" value="Hyväksy"
						onclick="tutkiJaPaivita()"></td>
				</tr>
			</tbody>
		</table>
		<input type="hidden" name="id" id="id">
	</form>
	<span id="ilmo"></span>
</body>
<script>
	haeAsiakas()
</script>
</html>