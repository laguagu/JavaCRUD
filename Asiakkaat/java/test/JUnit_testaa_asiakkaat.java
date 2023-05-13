package test;

import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import model.Asiakas;
import model.dao.Dao;

@TestMethodOrder(OrderAnnotation.class)
class JUnit_testaa_asiakkaat {

	@Test
	@Order(1) 
	public void testPoistaKaikkiAsiakkaat() {
		Dao dao = new Dao();
		dao.removeAllItems("Nimda");
		ArrayList<Asiakas> asiakkaat = dao.getAllItems();
		assertEquals(0, asiakkaat.size());		
	}

	@Test
	@Order(2) 
	public void testLisaaAsiakas() {
		Dao dao = new Dao();
		//
		Asiakas asiakas_1 = new Asiakas(1,"Matti", "Pekurinen", "0505040", "masa@hotmail.com");
		Asiakas asiakas_2 = new Asiakas(2,"Saku", "Pekurinen", "0505040", "masa@hotmail.com");
		Asiakas asiakas_3 = new Asiakas(3,"Lauri", "Pekurinen", "0505040", "masa@hotmail.com");
		Asiakas asiakas_4 = new Asiakas(4,"Tuula", "Pekurinen", "0505040", "masa@hotmail.com");
		assertEquals(true, dao.addItem(asiakas_1)); //tai assertTrue(dao.addItem(auto_1));	
		assertEquals(true, dao.addItem(asiakas_2));
		assertEquals(true, dao.addItem(asiakas_3));
		assertEquals(true, dao.addItem(asiakas_4)); 	
		assertEquals(4, dao.getAllItems().size());		
	}

	
	@Test
	@Order(3) 
	public void testMuutaAsiakas() {
		//Muutetaan asiakkaan Matti etunimi Saku
		Dao dao = new Dao();		
		ArrayList<Asiakas> asiakkaat = dao.getAllItems("Matti");		
		asiakkaat.get(0).setEtunimi("Saku");		
		dao.changeItem(asiakkaat.get(0));
		asiakkaat = dao.getAllItems("Saku");
		assertEquals("Saku", asiakkaat.get(0).getEtunimi());
		assertEquals("Pekurinen", asiakkaat.get(0).getSukunimi());
		assertEquals("0505040", asiakkaat.get(0).getPuhelin());
		assertEquals("masa@hotmail.com", asiakkaat.get(0).getSposti());		
	}
	
	@Test
	@Order(4) 
	public void testPoistaAsiakas() {
		//Poistetaan se asiakas, jonka nimi on Saku
		Dao dao = new Dao();
		ArrayList<Asiakas> asiakas = dao.getAllItems("Saku");
		dao.removeItem(asiakas.get(0).getId());
		assertEquals(0, dao.getAllItems("Saku").size());					
	}
	
	@Test
	@Order(5) 
	public void testHaeOlematonAsiakas() {
		//Haetaan asiakas,jonka id on -1
		Dao dao = new Dao();
		assertNull(dao.getItem(-1));
	}
}