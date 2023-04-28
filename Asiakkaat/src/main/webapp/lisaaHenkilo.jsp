<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<script src="scripts/main.js"></script>
<link rel="stylesheet" href="styles/style.css">
<title>Henkilon lisäys</title>
</head>
<body>
	<form name="lomake">
		<table id="listaus">
			<thead>
				<tr>
					<th colspan="5"><a href="ListaaAsiakkaat.jsp">Takaisin
							listaukseen</a></th>
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
					<td><input type="button" value="Lisää"
						onclick="tutkiJaLisaa()" /></td>
				</tr>
			</tbody>
		</table>
	</form>
	<p id="ilmo"></p>
</body>
</html>